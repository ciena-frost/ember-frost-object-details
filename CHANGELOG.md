# 1.0.0
## API
* All the code was based of the routing concept. We are now using the components and elsewhere concepts.
* Simplify the animations
* Sample of the new API:
```
{{frost-object-details
  selectedTabName=selectedTabName
  selectedTabType=selectedTabType
  defaultTabName='profile'
  detailTabs=(array
    (component 'frost-object-tab'
      name='profile'
      text='Profile View'
      content=(component 'object-details-content' color='skyblue' name='profile')
    )
  )
  relatedObjectTabs=(array
    (component 'frost-related-object-tab'
      name='devices'
      text='Devices'
      icon=(hash
        name='network-element'
        pack='dummy'
      )
      content=(component 'object-details-content' color='coral' name='related devices')
    )
  )
}}
```

## Code
* Add integration tests
* Slip the code in small and simpler components
* Remove unnecessary tools, dependecies, code, etc.
* Check the attributes set on a component with `ember-prop-types`
* Update dependecies to the latest (`ember@2.8`, `liquid-fire@0.26.0`, `ember-elsewhere@0.4.1`, etc.)
* Replace baseURL by rootURL
* Use the lastest version of mirage
* Split the css in multiple files (based on the structure as the component)
* Remove the usage of `block-slots` and replace by components and elsewhere
* Add demo

## Tools
* Replace `blanket` by `ember-cli-code-coverage`
* Add the GitHub PR template
* Add sass linting
* Add template linting
* Add visual acceptance test
* Update the build to use the new tools
* Run tests against Chrome
* User `ember-hook`

## Documentation
* Update the documentation

## Fix
#12 


# 0.2.0

* **Added** tab follower feature to view route.
* **Added** assert check for `default view route`.
* **Updated** styles for tabs and tab separator.
* **Updated** to consume `icon-page`.
* **removed** default margin for main content.



