var should = require("should");
var Plugin = require("../index.js");

var fixtures = require("./fixtures");

describe("plugin", function () {
  let plugin;
  
  beforeEach(() => {
    plugin = new Plugin({plugins: {}});
  });
  
  it("Should convert html and style file strings to require()s", function () {
    runTest(fixtures.simpleAngular2TestComponentFileStringSimple, `
  import {Component} from '@angular/core';

  @Component({
    selector: 'test-component',
    template: require('./some/path/to/file.html'),
    styles: [require('./app/css/styles.css')]
  })
  export class TestComponent {}
`);
  });

  it("Should convert html and style file strings to require()s regardless of inner quotes", function () {
    runTest(fixtures.componentWithQuoteInUrls, String.raw`
  import {Component} from '@angular/core';

  @Component({
    selector: 'test-component',
    template: require('./some/path/to/file\'.html'),
    styles: [require('./app/css/\"styles\".css\\')]
  })
  export class TestComponent {}
`
    );

  });

  it("Should convert html and multiple style file strings to require()s", function () {
    runTest(fixtures.componentWithMultipleStyles, `
  import {Component} from '@angular/core';

  @Component({
    selector: 'test-component',
    template: require('./some/path/to/file.html'),
    styles: [
      require('./app/css/styles.css'),
      require('./app/css/more-styles.css')
    ]
  })
  export class TestComponent {}
`
    );
  });

  it("Should return original source if there are no matches", function () {
    runTest('foo', 'foo');
  });

  it("Should convert partial string match requires", function () {
    runTest(`templateUrl: './index/app.html'`, `template: require('./index/app.html')`);
  });

  it("Should handle the absense of proper relative path notation", function () {
    runTest(fixtures.componentWithoutRelPeriodSlash, `
  import {Component} from '@angular/core';

  @Component({
    selector: 'test-component',
    template: require('./file.html'),
    styles: [require('./styles.css')]
  })
  export class TestComponent {}
`
    );
  });

  it("Should convert html and style file strings to require()s regardless of spacing", function () {
    runTest(fixtures.componentWithSpacing, `
  import {Component} from '@angular/core';

  @Component({
    selector : 'test-component',
    template: require('./some/path/to/file.html'),
    styles: [require('./app/css/styles.css')]
  })
  export class TestComponent {}
`
    );
  });

  function runTest(fixture, expectedResult) {
    plugin.compile({data: fixture}).then(result => {
      result.data.should.be.eql(expectedResult);
    });
  }

});