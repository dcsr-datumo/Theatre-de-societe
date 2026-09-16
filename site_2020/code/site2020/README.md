# Site2020

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Container CI and releases

Pull requests and pushes to `master` build the application and cache-updater
containers for AMD64 without logging in to Docker Hub or publishing images.

Application releases use an explicit Git tag of the form `app-vX.Y.Z`. The CI
workflow strips the `app-` prefix and publishes only
`platec/tds:vX.Y.Z` for AMD64 and ARM64. It does not update `latest`
automatically. Cache-updater releases use the separate `updater-vX.Y.Z` tag
family and publish only `platec/tds_cache_updater:vX.Y.Z`.

Do not reuse the historical ambiguous `v*` Git tag family for new releases.
Creating a release tag is a publication action, not deployment authorization.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Production compatibility baseline (September 2026)

The frontend uses the central public DSP API and ontology at api.dasch.swiss.
Year-specific representation lists and resource details need live API calls;
local cache files only cover indexes/summary data. KnoraPeriod values render
as intervals. The authenticated SPARQL cache updater is a separate dependency
and remains disabled; this application change does not reactivate it.

Build with Node 20.19.0 (Angular 17); the runtime nginx 1.27.2 matches the
September 2026 deployed version. These version pins reproduce that baseline,
not a claim of current security support. Security upgrades are separate work.
Preserve both nginx configuration files: they include production security
headers and relative /assets redirects behind the TLS-terminating proxy.
Do not remove absolute_redirect off: HTTP redirect targets break Firefox images.

Assets are copied under /assets and at the web root for compatibility with the
existing redirect rule. The four canonical JSON caches match the retained
production generation (383 authors, 159 calendar rows, 672 places, 1054 works).
Do not regenerate or promote scientific caches as part of a frontend release.
Image rebuilds must recheck the current live cache hashes before deployment.

Operational authorization, recovery and acceptance belong to unil-ops #87.
The September 15–16 production changes were packaged separately; merging this
source reconciliation does not itself deploy or publish an image. Preserve the
original rollback container/configuration according to the VM runbook.
