import json
import argparse
import requests

"""
utility script to refresh the cache for Théâtre de Société

first query GraphDB to get the list of years and the number of representions
then delete existing cache data
finally insert the read data
"""

class Store:
    """
    common class for connexion
    """
    def __init__(self, user: str, password: str, server: str):
        self.user = user
        self.password = password
        self.server = server

class Knora(Store):
    def __init__(self, user: str, password: str, server: str, code: str, name: str):
        Store.__init__(self, user, password, server)
        self.pcode = code
        self.pname = name
        base = server.split("/")[2]
        self.base = base.split(":")[0]


    def createResource(self, query):
        response = requests.post(
            url="{}/v2/resources".format(self.server),
            auth=(self.user, self.password),
            data=query
        )
        # TODO:- handle errors
        response.raise_for_status()


    def createCache(self, year, representations):
        query = """
        {{
            "@type": "theatre-societe:CacheCalendarYear",
            "theatre-societe:cacheCalendarYearHasYear": {{
                "@type": "knora-api:IntValue",
                "knora-api:intValueAsInt" : {year}
            }},
            "theatre-societe:cacheCalendarYearHasRepresentations": {{
                "@type": "knora-api:IntValue",
                "knora-api:intValueAsInt" : {representations}
            }},
            "knora-api:attachedToProject" : {{
                "@id" : "http://rdfh.ch/projects/0103"
            }},
            "rdfs:label" : "{year}",
            "@context" : {{
                "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "knora-api" : "http://api.knora.org/ontology/knora-api/v2#",
                "rdfs" : "http://www.w3.org/2000/01/rdf-schema#",
                "xsd" : "http://www.w3.org/2001/XMLSchema#",
                "theatre-societe" : "http://{base}/ontology/0103/theatre-societe/v2#"
            }}
        }}
        """.format(year=year, representations=representations, base=self.base)
        self.createResource(query)


    def getRepresentationsPerYearPage(self, offset):
        query = '''
            PREFIX knora-api: <http://api.knora.org/ontology/knora-api/v2#>
            PREFIX project: <http://{base}/ontology/{code}/{name}/v2#>
            CONSTRUCT {{ 
                ?cache knora-api:isMainResource true .
                ?cache project:cacheCalendarYearHasYear ?year .
                ?cache project:cacheCalendarYearHasRepresentations ?representations .
            }} WHERE {{
                ?cache a knora-api:Resource .
                ?cache a project:CacheCalendarYear .
                ?cache project:cacheCalendarYearHasYear ?year .
                ?cache project:cacheCalendarYearHasRepresentations ?representations .
            }}
            ORDER BY ?year
            OFFSET {offset}
        '''.format(base=self.base, code=self.pcode, name=self.pname, offset=offset)
        print(query)

        response = requests.post(
            url="{}/v2/searchextended".format(self.server),
            auth=(self.user, self.password),
            data=query
        )
        response.raise_for_status()
        data = json.loads(response.text)
        for element in data["@graph"]:
            print(element["rdfs:label"])
            print(element["theatre-societe:cacheCalendarYearHasRepresentations"]["knora-api:intValueAsInt"])

class Graphdb(Store):
    def __init__(self, user: str, password: str, server: str, repo: str, knora: Store):
        Store.__init__(self, user, password, server)
        self.knora = knora
        self.repo = repo

    def post(self, query, qu):
        url = "{}/repositories/{}".format(self.server, self.repo)
        if (qu == "update"):
            url = url + "/statements"
        response = requests.post(
            url,
            headers={"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            auth=(self.user, self.password),
            data="{}={}".format(qu, query)
        )
        if (not response.ok):
            print("error: {}".format(response.text))
        response.raise_for_status()
        return response.text
       

    def getRepresentationsPerYearPage(self, offset):
        query = '''
        PREFIX theatre-societe: <http://www.knora.org/ontology/0103/theatre-societe#>
        PREFIX knora-base: <http://www.knora.org/ontology/knora-base#>
        select ?year (count(distinct ?s) as ?representations)
        where { 
	        ?s a theatre-societe:Representation .
            ?s theatre-societe:hasDate ?date .
            ?date knora-base:valueHasString ?dateString . 
            bind(replace(?dateString, '-.*', '') as ?year)
        }
        group by ?year
        order by ?year
        '''
        return self.post(query, "query")


    def clearCache(self):
        query = """
        PREFIX knora-base: <http://www.knora.org/ontology/knora-base#>
        DELETE
        WHERE {
            ?s ?p ?o .
            ?s a <http://www.knora.org/ontology/0103/theatre-societe#CacheCalendarYear>
        }
        """
        self.post(query, "update")


    def replaceCache(self):
        raw = self.getRepresentationsPerYearPage(0)
        lines = raw.split('\r\n')
        if len(lines) > 0:
            self.clearCache()

        # skip first and last lines (first is the header, last is empty)
        for line in lines[1:-1]:
            (year, representations) = line.split(',')
            # year is declared as an int, leading '0' are not allowed
            year = year.lstrip("0")
            print("year: {}, rep: {}".format(year, representations))
            knora.createCache(year, representations)


parser = argparse.ArgumentParser()
# graphdb args
parser.add_argument("-u", "--usergraphdb",
                    help="graphdb user",  required=True)
parser.add_argument("-p", "--passwordgraphdb",
                    help="graphdb password",  required=True)
parser.add_argument("-s", "--servergraphdb",
                    help="graphdb server url", required=True)
parser.add_argument("-r", "--repoid",
                    help="graphdb repo id", required=True)
# knora args
parser.add_argument("-v", "--userknora",
                    help="knora user",  required=True)
parser.add_argument("-q", "--passwordknora",
                    help="knora password",  required=True)
parser.add_argument("-t", "--serverknora",
                    help="knora server url", required=True)
args = parser.parse_args()

knora = Knora(args.userknora, args.passwordknora, args.serverknora, "0103", "theatre-societe")

graphdb = Graphdb(args.usergraphdb, args.passwordgraphdb, args.servergraphdb, args.repoid, knora)
graphdb.replaceCache()
