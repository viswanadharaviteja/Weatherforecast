var {defineSupportCode} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');
var chrome = require('Selenium-webdriver/chrome');

function CustomWorld({attach}) {
  console.log("Browser is set as chrome");
  this.attach=attach;
  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();

  }
  defineSupportCode(function({setWorldConstructor,setDefaultTimeout}){
    setWorldConstructor(CustomWorld);
    setDefaultTimeout(60*1000);

});
