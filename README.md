# angular2-templates-brunch

Brunch plugin for inlining Angular 2 component templates and styles.

[![Build Status](https://travis-ci.org/corballis/angular2-templates-brunch.svg?branch=master)](https://travis-ci.org/corballis/angular2-templates-brunch)
[![codecov](https://codecov.io/gh/corballis/angular2-templates-brunch/branch/master/graph/badge.svg)](https://codecov.io/gh/corballis/angular2-templates-brunch)

## Installation
```bash
npm install --save-dev angular2-templates-brunch
```

Or manually:

* Add `"angular2-templates-brunch": "x.y.z"` to package.json
* Run `npm install`
* Alternatively, you may use the latest git version with:
  * `"angular2-templates-brunch": "git@github.com:corballis/angular2-templates-brunch.git"`
  
The generated require statements will be handled by the brunch wrapper scripts. In order for this to work, you need to
set up Brunch to handle your html templates and stylesheets:

```javascript
exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^node_modules/,
        'main.js': /^app/
      },
      order: {
        after: [/\.html$/, /\.css$/]
      }
    },
    stylesheets: {
      joinTo: 'app.css'
    },
    templates: {
      joinTo: 'main.js'
    }
  }
};
```
  
## How it works

The plugin searches for templateUrl and styleUrls declarations inside of the Angular 2 Component metadata and replaces 
the paths with the corresponding require statement.

## Example

### Source
Here is an example Angular 2 component that uses styleUrls and templateUrl:

```js
@Component({
  selector: 'awesome-button',
  templateUrl: './button.template.html',
  styleUrls: ['./button.style.css']
})
export class AwesomeButtonComponent { }
```

### Result
The plugin produces the following output:

```js
@Component({
  selector: 'awesome-button',
  template: require('./button.template.html'),
  styles: [require('./button.style.css')]
})
export class AwesomeButtonComponent { }
```

## Credits
This plugin is a port of [angular2-template-loader](https://github.com/TheLarkInn/angular2-template-loader) for Webpack.
