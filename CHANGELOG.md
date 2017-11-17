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



