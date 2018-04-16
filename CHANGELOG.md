# 8.0.2 (2018-04-16)
* **Updated** set `copyAttrs` in `svgStoreOpts` for dummy app

# 8.0.1 (2018-04-16)
* **Installed** `ember-cli-svgstore` as a devDependency
* **Updated** dummy app configuration to produce svg icons

# 8.0.0 (2018-04-13)
* **Updated** `ember-frost-core` to version `^8.0.0`


# 7.0.0 (2018-03-23)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Updated** `ember-cli-frost-blueprints` to `^5.0.2`
* **Updated** `ember-prop-types` to `^7.0.1`
* **Updated** `ember-frost-core` to `^7.0.0`
* **Removed** ignoring of `package-lock.json` file
* **Added** `package-lock.json` file
* **Updated** Travis CI scripts to allow non-exact node version

# 6.0.0 (2018-01-30)
* **Added** ignore the linting of the `CHANGELOG.md`
* **Added** ignoring of `package-lock` until we are ready to move to node 8
* **Added** ignoring of `.DS_Store` files
* **Removed** useLintTree ember-cli-mocha configuration from `ember-cli-build.js`
* **Removed** `.remarkrc` file since it is now provided by `ember-test-utils`
* **Removed** `.template-lintrc` file since it is now provided by `ember-test-utils`
* **Updated** `ember-frost-test` to `^4.0.0`
* **Updated** `ember-cli-chai` to `0.4.3`
* **Updated** `ember-sinon` to `^0.7.0`
* **Updated** `ember-test-utils` to `^8.1.0`
* **Updated** `sinon-chai` to `^2.14.0`
* **Updated** `ember-browserify` to `^1.2.0`
* **Updated** `ember-cli-code-coverage` to `0.3.12`
* **Added** `ember-cli-frost-blueprints` @ `^5.0.1`
* **Removed** unused `ember-cli-notifications` package
* **Removed** `ember-cli-template-lint` since it is provided by `ember-test-utils`
* **Updated** pin `ember-code-snippet` to `1.7.0`
* **Updated** `ember-computed-decorators` to `0.3.0` and moved from devDependency to dependency
* **Removed** unused `ember-lodash-shim` package
* **Removed** unused `lodash-es` package
* **Removed** unused `redux` package
* **Removed** unused `redux-thunk` package
* **Updated** `ember-cli-sass` to `7.1.1`
* **Updated** `ember-frost-core` to `^5.1.1`
* **Updated** `ember-elsewhere` to `1.0.1`
* **Updated** `ember-hook` to `1.4.2`
* **Updated** `ember-prop-types` to `^6.0.1`
* **Updated** `liquid-fire` to `0.27.2`
* **Removed** unused `ember-inflector` bower package
* **Removed** unused `lodash` bower package
* **Removed** no longer needed `sinonjs` bower package since we are using the npm package
* **Removed** unused `es6-promise` bower package
* **Removed** unused `resemblejs` bower package
* **Updated** `Faker` and `pretender` bower packages to be devDependencies
* **Updated** refactored `parentHook` assignment to `hook` properties. Per our coding standards they are required to be `readOnly computed` properties. Due to the current implementation they could not be made `readOnly` as they were currently implemented.
* **Updated** `registerTabs` and `animations` properties to be assigned functions bound to parent context instead of computed properties. Our design standards require computed properties to be `readOnly` but it was not possible to make them `readOnly` computed properties as they were currently implemented.
* **Updated** integration tests that were using `hook` to find elements in the DOM as they were not previously aware of the parent hook.
* **Updated** computed properties that were not `readOnly` to now be so.
* **Updated** move code coverage config file to tests/dummy/config/ and add json-summary reporter


# 5.0.0 (2017-12-07)
* **Updated** to version 4 of `ember-frost-core`
* **Updated** `ember-hook` from a devDependency to a dependency
* **Updated** to version 5 of `ember-prop-types` and move to dependency
* **Updated** `ember-elsewhere` from a devDependency to a dependency
* **Removed** `ember-concurrency` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** `ember-spread` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** `ember-truth-helpers` package since it is not used here and is now provided by `ember-frost-core` via it's own dependencies.
* **Removed** blueprint file since it is no longer needed

# 4.0.2 (2017-11-17)
* #50 - Bind context to call of this._super.included() in index.js

# 4.0.1 (2017-11-14)
* Refactor to remove `ember-simple-uuid` dependency

# 4.0.0 (2017-11-08)
* Use the latest `ember-frost-core`, with a flexible minor version (`^3.0.1`)


# 3.0.13 (2017-08-11)
* Upgrade ember-cli 2.12.3 inter-dependencies

# 3.0.12 (2017-07-12)
* Upgrade `ember-cli` to 2.12.3

# 3.0.11 (2017-05-10)
* **Updated** secure auth token


# 3.0.10 (2017-04-21)
* **Added** blueprint check

# 3.0.9
* **Updated** the travis.yml and package.json to run code coverage

# 3.0.8
* **Updated** to use latest pr-bumper which supports being able to set a PR to `none` when publishing a new version is not desired.

# 3.0.7
* Hide object details tab divider when a tab is set as `isVisible=false`

# 3.0.6
* **Updated** integration tests to remove the deprecated use of `describeComponent()`


# 3.0.5
- Only render relatedObjectTabs if present

Closes #33

# 3.0.4
* Passing a complex object to liquid-bind caused an over-aggressive destruction of content components, fixed the
liquid-bind to use a simple property and passed other values required for animation matches via registration


# 3.0.3
* Fixed content padding top

# 3.0.2
* Fixed tab divider


# 3.0.1
* Updated ember-frost-core


# 3.0.0
* **Updated** `ember-frost-core` to `^1.0.0`



# 2.0.0
**upgrade** Ember cli and node.
**fix** coverage reporting



# 1.0.5

Please add a description of your change here, it will be automatically prepended to the `CHANGELOG.md` file.
- Move ember-simple-uuid from devDependencies to dependencies


# 1.0.4
* Change permissions on file to enable deployment of the demo.


# 1.0.3
* Force build and force push demo



# 1.0.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.2.0

* **Added** tab follower feature to view route.
* **Added** assert check for `default view route`.
* **Updated** styles for tabs and tab separator.
* **Updated** to consume `icon-page`.
* **removed** default margin for main content.



