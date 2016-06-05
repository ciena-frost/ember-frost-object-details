[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-object-details.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-object-details

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-object-details.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-object-details

[npm-img]: https://img.shields.io/npm/v/ember-frost-object-details.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-object-details

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-object-details
An object details page packages together all details about an object in a full page of real estate. The ember-frost-object-details component will provide you free animations, styles and the frame of the page with simple setup. 

With current design, you need have two directories named views and related at the same level as the template you decided to use frost-object-details. All your view routes and related routes should go into the corresponding dirs.
 
 * [Installation](#Installation)
 * [API](#API)
 * [Examples](#Examples)
 * [Contributing](#Contributing)

## Installation
```
ember install ember-frost-object-details
```

## API
| Component | Attribute | Type | Value | Description |
|---------| --------- | ---- | ----- | ----------- |
| `{{frost-object-details}}` | `defaultRoute` | `string` | | Default entry route for object details view (Mandatory) |
| `{{routes.view}}` | `detailsRouteIndex` | `number` | |  Provide left-to-right or right-to-left slide animation when transition between two view routes based on comparing their detailsRouteIndex value (Optional) |
| `{{routes.related}}` | `icon` | `string` | | The name of the icon to display (Optional) |

## Examples
### frost-object-details
In this scenario, frost-object-details is rendered in details/template.hbs . Two dirs were created as details/views and details/related with corresponding sub-routes inside it. 
The frost-object-details is usually used with two contextual components, view and related. The 'view' route component is usually used to display and select alternate available object views, and the 'related' route component will render a quick link to important related data in context of the object.
```handlebars
{{#frost-object-details defaultRoute='details.views.profile' as |slot|}}
  
  {{#block-slot slot 'view-route' as |routes|}}
    {{#routes.view 'details.views.profile' detailsRouteIndex=1}}Profile View{{/routes.view}}
    {{#routes.view 'details.views.preferences' detailsRouteIndex=2}}Preferences View{{/routes.view}}
    {{#routes.view 'details.views.details' detailsRouteIndex=3}}Details View{{/routes.view}}
  {{/block-slot}}
  
  {{#block-slot slot 'related-route' as |routes|}}
    {{#routes.related 'details.related.devices' icon='network-element'}}Devices{{/routes.related}}
    {{#routes.related 'details.related.friends' icon='tenant'}}Friends{{/routes.related}}
    {{#routes.related 'details.related.subscriptions' icon='service'}}Subs{{/routes.related}}
  {{/block-slot}}
  
{{/frost-object-details}}
```

### ember-block-slot  
Ember-block-slots is used in frost-object-details for conditional yield. Both 'view-route' and 'related-route' are predefined key for corresponding section yield and you should use it as so for your different routes section without change
##### For view routes
```handlebars
{{#block-slot slot 'view-route' as |routes|}}
{{/block-slot}}
```
##### For related routes
```handlebars
{{#block-slot slot 'related-route' as |routes|}}
{{/block-slot}}
```

### Sub-routes: view routes and related routes
Block-slot will yield back a hash containing contextual components which you can use to render your sub-routes. You can get access to these contextual components in hash via a predefined key. There are two different types of contextual components, '.view' for view routes and '.related' for related routes. Both of them are built on top of ember {{link-to}} helper and you can treat them just like {{link-to}} when handling route name and dynamic segments. 
##### For view routes
```handlebars
{{#routes.view 'details.views.profile' detailsRouteIndex=1}}Profile View{{/routes.view}}
{{#routes.view 'details.views.preferences' detailsRouteIndex=2}}Preferences View{{/routes.view}}
{{#routes.view 'details.views.details' detailsRouteIndex=3}}Details View{{/routes.view}}
```

##### For related routes
```handlebars
{{#routes.related 'details.related.devices' icon='network-element'}}Devices{{/routes.related}}
{{#routes.related 'details.related.friends' icon='tenant'}}Friends{{/routes.related}}
{{#routes.related 'details.related.subscriptions' icon='service'}}Subs{{/routes.related}}
```
### Styles
Default styles can be applied to your sub-routes.

##### Default Margin
To get a default margin for your content area, add the 'frost-object-browser__content' class to your template.
```handlebars
<div class="frost-object-details__content" style="background-color: skyblue; height: 600px">
    This is profile template
</div>
```

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-object-details.git
cd ember-frost-object-details
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-object-details/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.
