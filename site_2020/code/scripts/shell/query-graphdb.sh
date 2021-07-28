#! /usr/bin/env bash

###############################################################################

#
# GraphDB Sparql query execution script 
#
# send a query to a GraphDB sparql end point
#

###############################################################################

# sanity checks
# exit when a command fails, use "cmd || true" to allow "cmd" to fail
# comment this out is you need to know that it failed
set -o errexit
# don't allow undeclared variables
#set -o nounset
# exit on pipe failure (cmd1 | cmd2 : exits if cmd2 fails)
set -o pipefail
# comment xtrace when not in debug
set -o xtrace


###############################################################################

function do-main {
    # check query file
    if [[ -z $ARG_QUERY ]]; then
      echo "no query file specified"
      print_help
      exit 1
    fi

    if [[ "${ARG_QUERY##*.}" == "sparql" ]]; then
        QUERY=`cat $ARG_QUERY | wwwenc`
    else
        QUERY=`cat $ARG_QUERY`
    fi

    # check repo
    if [[ -z $ARG_REPO ]]; then
      echo "no repo file specified"
      print_help
      exit 1
    fi

    case ${ARG_FORMAT:=json} in
    json)
        ACCEPT="application/sparql-results+json"
        ;;
    xml)
        ACCEPT="application/rdf+xml"
        ;;
    trig)
        ACCEPT="application/x-trig"
        ;;
    ttl)
        ACCEPT="text/turtle"
        ;;
    csv)
        ACCEPT="text/csv"
        ;;
    *)
        echo "unknown file format"
        print_help
        exit 1
    esac

    curl "${FLAG_HTTP:-http}://${ARG_USER:+$ARG_USER${ARG_PASSWORD:+:$ARG_PASSWORD}@}${ARG_HOST:-localhost}${ARG_PORT:+:$ARG_PORT}/repositories/${ARG_REPO:-knora-test}" \
    -H "Accept:${ACCEPT}" \
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
    --data-raw "query=${QUERY}&infer=true&sameAs=true&limit=1000&offset=0" \
    ${ARG_OUTPUT:+-o $ARG_OUTPUT.$ARG_FORMAT}
}

function do-parse_args {
    ARG_CONFIG=
    for i in "$@"; do
        case $i in
            # flags
            -v|--verbose)
            FLAG_VERBOSE=0
            ;;
            --help)
            print_help
            exit 0
            ;;
            # arguments
            -e=*|--env=*)
            ARG_ENV="${i#*=}"
            shift
            ;;
            -u=*|--user=*)
            ARG_USER="${i#*=}"
            shift
            ;;
            -p=*|--password=*)
            ARG_PASSWORD="${i#*=}"
            shift
            ;;
            -s)
            FLAG_HTTP="https"
            shift
            ;;
            -h=*|--host=*)
            ARG_HOST="${i#*=}"
            shift
            ;;
            --port=*)
            ARG_PORT="${i#*=}"
            shift
            ;;
            -r=*|--repo=*)
            ARG_REPO="${i#*=}"
            shift
            ;;
            -q=*|--query=*)
            ARG_QUERY="${i#*=}"
            shift
            ;;
            -o=*|--output=*)
            ARG_OUTPUT="${i#*=}"
            shift
            ;;
            -f=*|--format=*)
            ARG_FORMAT="${i#*=}"
            shift
            ;;
            *)
            echo "unknown argument switch: $1"
            echo
            print_help
            exit 1
            ;;
        esac
    done

    if [[ -n "$ARG_ENV" ]]; then
        if [[ -r $ARG_ENV ]]; then
            source $ARG_ENV
        else
            echo "ERROR: environment file is not readable ($ARG_ENV)"
            exit 1
        fi
    fi
}

function print_help {
    cat >&2 << EOF
Execute a query on a graphdb server.

Usage: $0 [-v][--help] [--env=env_file] [--user=user] [--password=password] [-s] [--host=graphdb_host] [--port=port] [--repo=repo] --query=query_file [--output=output_file] [--format=rdf_format]

argument list:
  -v                : verbose
  --help            : print this message
  -e|--env=env_file : environment variable file
  -u|--user=user    : graphdb user
  -p]--password=pwd : graphdb pwd
  -s                : use protocol https
  -h|--host=host    : graphdb host, only the domain name
  --port=port       : graphdb port
  -r|--repo=repo    : graphdb repo id
  -q|--query=query  : file name of the query file
  -o|--output=file  : file to writre he output to
  --format=rdf_fmt  : rdf format (csv,ttl,json) 

Note: the format has to match the nature of the data:
      ttl or trig are made for triples and graph and can
      be used to format 'construct'.
      A 'select' query can formatted as csv or json.

EOF
}
###############################################################################

# main

# delegate the argument parsing to `do-parse_args`
do-parse_args $@

do-main

exit 0
