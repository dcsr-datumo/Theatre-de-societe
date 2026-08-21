# Cache updater

The application serves four JSON caches generated from the DaSCH SPARQL
endpoint: authors, calendar, places and works.

## Environment

Copy the tracked empty example and populate only the ignored local copy:

```bash
cp env/dasch.env.example env/dasch.env
```

Required variables are `DASCH_SPARQL_URL`, `DASCH_USER` and
`DASCH_PASSWORD`. The legacy `TS_PSWD` password variable remains temporarily
accepted so the existing production environment can be migrated safely. Never
commit or print a populated environment file.

The endpoint defaults to the current Lausanne instance. Override it through
the environment after DaSCH confirms the central SPARQL endpoint; an endpoint
change does not require rebuilding the image.

## Local generation

Generate a complete cache set in a staging directory. The command promotes it
to `output/` only after all four files are non-empty JSON arrays whose records
contain the fields and value types expected by the application. Works and
places identifiers, plus calendar years, must also be unique:

```bash
set -a
. env/dasch.env
set +a
make refresh
make copy_local
```

HTTP errors, TLS validation failures, timeouts, invalid JSON and empty arrays
all stop the refresh. Existing application caches are not changed by a failed
generation.

## Container build and release

Local build and execution:

```bash
make build
make run
```

Repository CI validates this image without publishing on pull requests and
`master`. An explicit `updater-vX.Y.Z` Git tag publishes only the matching
`platec/tds_cache_updater:vX.Y.Z` AMD64/ARM64 image. Application images use the
separate `app-vX.Y.Z` tag family. Neither release path updates `latest`
automatically.

Creating a release tag publishes an image; it does not authorize production
deployment or cache replacement.

## Production procedure

The commands below illustrate the runtime boundary. Use the approved immutable
version and keep the updater cron contained until the endpoint, credentials,
generated-cache comparison and rollback boundary have been approved.

```bash
podman pull docker.io/platec/tds_cache_updater:vX.Y.Z
mkdir -p /home/tdsadm/output
podman run --rm \
  --env-file /home/tdsadm/updater_prod_env \
  -v /home/tdsadm/output:/app/output \
  docker.io/platec/tds_cache_updater:vX.Y.Z

for file in authors_cache.json calendar_cache.json places_cache.json works_cache.json; do
  sudo podman cp \
    "/home/tdsadm/output/$file" \
    "tds:/usr/share/nginx/html/cache/$file" || exit 1
done
```

The container exits successfully only after generating and validating all four
files. Before copying them, compare counts and representative records with the
currently served cache set and preserve the latter as rollback evidence.
