# Cache update

Now the cache are on the web application server.

## load environment file

to use locally the same file as bundled with the docker container, do:

```bash
. env/prod.env
```

before the rest of the commands.

## local

before a release, bundle a new version of the cache:
```bash
make clean
make all_cache
make copy_local 
```

## remote

to update the cache on a remote host:
```bash
make clean
make all_cache
make copy_remote 
```

## dockerized

the updater is then dockerized:
```bash
# build the image
make build
# publish it to docker hub
make login
make push
```

## release

on the server:
```bash
# get the cache updater image
podman pull docker.io/platec/tds_cache_updater:v0.1.0
# make a folder to exchange files
mkdir output
# run the cache updater
podman run --env-file /home/tdsadm/updater_prod_env -v /home/tdsadm/output:/app/output platec/tds_cache_updater:v0.1.0
# copy the files to the server
for file in `ls output/*.json`; do sudo podman cp $file tds:/usr/share/nginx/html/cache/; done
```

configure crontab to run the process regularly:
```bash
5 3 * * 6	/usr/bin/podman run --env-file /home/tdsadm/updater_prod_env -v /home/tdsadm/output:/app/output platec/tds_cache_updater:v0.1.0 && \
            for file in `ls /home/tdsadm/output/*.json`; do sudo podman cp $file tds:/usr/share/nginx/html/cache/; done
```
