'use strict';

const TEMPLATE_URL_REGEX = /templateUrl *:(.*)$/gm;
const STYLES_REGEX = /styleUrls *:(\s*\[[^\]]*?\])/g;
const STRING_REGEX = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function replaceStringsWithRequires(string) {
  return string.replace(STRING_REGEX, function (match, quote, url) {
    if (url.charAt(0) !== ".") {
      url = "./" + url;
    }
    return "require('" + url + "')";
  });
}

class Angular2TemplatesBrunchPlugin {
  constructor(config) {
    this.config = config.plugins.angular2Templates;
  }

  compile(file) {
    file.data = file.data.replace(TEMPLATE_URL_REGEX, function (match, url) {
      return "template:" + replaceStringsWithRequires(url);
    }).replace(STYLES_REGEX, function (match, urls) {
      return "styles:" + replaceStringsWithRequires(urls);
    });

    return Promise.resolve(file);
  }

}

Angular2TemplatesBrunchPlugin.prototype.brunchPlugin = true;
Angular2TemplatesBrunchPlugin.prototype.type = 'javascript';
Angular2TemplatesBrunchPlugin.prototype.extension = 'js';

module.exports = Angular2TemplatesBrunchPlugin;