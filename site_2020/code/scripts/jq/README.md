# jq filters

takes as input a json string resulting of:
```bash
./shell/query-graphdb.sh \
  -e=env/prod.env \
  -h=knora.unil.ch \
  --port=7200 \
  -r=knora-prod \
  -q=../requests/get_works.sparql \
  -f=json
```

which looks like:
```json
{ "head" : { "vars" : [ "id", "title", "name" ] },
  "results" : {
    "bindings" : [
    { "name" : { "type" : "literal", "value" : "Doze" },
      "id" : { "type" : "uri", "value" : "http://rdfh.ch/0103/5Jx7brZmRS6nxERvG9g8FQ" },
      "title" : { "type" : "literal", "value" : "A deux pas du bonheur" }
    },
    { "name" : { "type" : "literal", "value" : "Musset" },
      "id" : { "type" : "uri", "value" : "http://rdfh.ch/0103/AmmXnOjbSRW0MRjac6lucg" },
      "title" : { "type" : "literal", "value" : "A quoi rêvent les jeunes filles?" }
    },
 ...
```

called as:
```bash
cat input.json | jq -f works-filter.jq
```

intended to be called by above make file:
```bash
make works_cache.json
```