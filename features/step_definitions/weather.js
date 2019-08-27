const { Given, When, Then} = require('cucumber');
const seleniumWebdriver = require('selenium-webdriver');
const functions = require('../step_definitions/functions');
var assert = require('assert');
const By = seleniumWebdriver.By
var map = seleniumWebdriver.promise.map;

Given(/^I launch the weather forecast page$/, function () {
  this.driver.get('http://localhost:3000');
  this.driver.sleep(2000);
  console.log("weather application is launched");
});

When(/^I enter the city name as (.*)$/, function (cityname) {
  var city = this.driver.findElement(By.id('city'));
  city.clear();
  this.driver.sleep(2000);
  city.sendKeys(cityname);
  console.log("city name is entered as "+cityname);
  city.sendKeys(seleniumWebdriver.Key.ENTER);
  return this.driver.sleep(2000);
});

Then(/^I should see the weather forecast data for five days$/, function () {
  console.log("5 day weather forecast of the day is being displayed");
  for (var i=1;i<=5;i++) {
    var selector = this.driver.findElement(By.xpath("//*[@data-test='day-"+i+"']"));
    selector.isDisplayed().then(function(value){
    return assert.equal(value,true);
    })
  }
});

When(/^I select day (.*)$/, function (val) {
  this.driver.findElement(By.xpath("//*[@data-test='day-"+val+"']")).click();
  console.log("clicked on the day");
  this.driver.sleep(2000);
});

Then(/^I should be able to see 3 hourly forecast for that day (.*)$/, function (day) {
  var hoursarray = [];
  console.log("3 hourly forecast of the day is being displayed");
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(elements){
  elements[day-1].findElements(By.xpath("//span[contains(@data-test, 'hour-')]")).then(function(hours){
  hours.forEach(function(hour){
      hour.getAttribute("innerText").then(function(textValue){
        hoursarray.push(parseInt(textValue));
        for (var i =0; i<hoursarray.length-1;i++){
        if((hoursarray[i+1]-hoursarray[i]===300)){
            break;
        }else{
          console.log('Fail');
          return false;
        }
      }
      });
    });

  });
  return true;
});
});

Then(/^I should not be able to see 3 hourly forecast for that day$/, function () {  this.driver.sleep(2000);
    var selector = this.driver.findElement(By.xpath("//div[@class='details']"));
    selector.isDisplayed().then(function(value){
    console.log('weather forecast should get hide');
    return assert.equal(value,false);
    });
});

Then(/^I should see the summarized view of min and max temparture of the day (.*)$/,function (day) {
  var tempvalues;
  var tempsumvalues;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){

      daydetails[day-1].findElement(By.xpath("//div[@class='summary']")).then(function(daytempsummary){
       return daytempsummary.findElements(By.xpath("//span[3]/span")).then(function(tempsummary){
        map(tempsummary, tempsummaryvalue => tempsummaryvalue.getAttribute("innerText"))
              .then(function(values) {
                tempsumvalues = values.map(function(v) {
                return parseInt(v, 10);
              });
            return tempsumvalues;
          });
        });
      });
    daydetails[day-1].findElement(By.xpath(".//div[@class='details']")).then(function(daytempdetails){
      return daytempdetails.findElements(By.xpath(".//div[@class='detail']/span[3]/span")).then(function(tempdetails){
        map(tempdetails, tempvalue => tempvalue.getAttribute("innerText"))
          .then(function(values) {
            tempvalues = values.map(function(v) {
            return parseInt(v, 10);
          });
          console.log('tempvalues',tempvalues);
          console.log('tempsumvalues',tempsumvalues);
          assert.equal(Math.max.apply(Math, tempvalues),Math.max.apply(Math, tempsumvalues))
          assert.equal(Math.min.apply(Math, tempvalues),Math.min.apply(Math, tempsumvalues))
        });
      });
    });
  });
});


Then(/^I should see the summarized view of Aggregate rainfall of the day (.*)$/,function (day) {
  var aggregate;
  var rainvalues;
  var aggregateRainfall;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){
      daydetails[day-1].findElement(By.xpath(".//div[@class='summary']")).then(function(dayrainsummary){
        return dayrainsummary.findElement(By.xpath("//span[5]/span[1]")).then(function(rainsummary){
          rainsummary.getAttribute("innerText").then(function(rainsumvalue){
            aggregate = parseInt(rainsumvalue);
            return aggregate;
          }); 
        });
      });

    daydetails[day-1].findElement(By.xpath("//div[@class='details']")).then(function(dayraindetails){
     return dayraindetails.findElements(By.xpath("//div[@class='detail']/span[5]/span[1]")).then(function(raindetails){
        map(raindetails, rainvalue => rainvalue.getAttribute("innerText"))
          .then(function(values) {
            rainvalues = values.map(function(v) {
            return parseInt(v, 10);
          });
          console.log('rainvalues are ',rainvalues);
          aggregateRainfall =(rainvalues.reduce((a, b) => a + b, 0))
          console.log('aggregateRainfall ',aggregateRainfall)
          return assert.equal(aggregateRainfall,aggregate);
        });
      }); 
    });
  });

});
Then(/^I should see the summarized view of most dominant wind speed of the day (.*)$/,function (day) {
  var windspeed;
  var windvalues;
  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(daydetails){

      daydetails[day-1].findElement(By.xpath("//div[@class='summary']")).then(function(daywindsummary){
        return daywindsummary.findElement(By.xpath("//span[4]/span[1]")).then(function(windsummary){
        windsummary.getAttribute("innerText").then(function(windsumvalue){
          windspeed = parseInt(windsumvalue);
          return windspeed;
        }); 
        });
      });

    daydetails[day-1].findElement(By.xpath(".//div[@class='details']")).then(function(daywinddetails){
      daywinddetails.findElements(By.xpath(".//div[@class='detail']/span[4]/span[1]")).then(function(winddetails){
        map(winddetails, windvalue => windvalue.getAttribute("innerText"))
          .then(function(values){
            windvalues = values.map(function(v){
              return parseInt(v, 10);
            });
            console.log("windvalues are: "+windvalues);
            console.log("wind speed is: "+windspeed);
            return assert.equal(windspeed,windvalues[0]);
          });
        }); 
      });
    });
});


Then(/^I should be able to see all values are rounded off$/, function () {

  this.driver.findElements(By.xpath("//div[@data-reactroot]/div")).then(function(details){

    details.forEach(function(daydetails){
      daydetails.findElement(By.xpath("//div[@class='summary']")).then(function(summary){
        // validating the rounded values of rain summary
        summary.findElement(By.xpath("//span[5]/span[1]")).then(function(rainsummary){
          rainsummary.getAttribute("innerText").then(function(rainvalue){
            console.log('rainvalue',parseInt(rainvalue));
            return assert.equal(parseInt(rainvalue),Math.round(parseInt(rainvalue))); 
          });
        });
        // validating the rounded values of wind summary
        summary.findElement(By.xpath("//span[4]/span[1]")).then(function(windsummary){
          windsummary.getAttribute("innerText").then(function(windvalue){
            console.log('windvalue',parseInt(windvalue));
            return assert.equal(parseInt(windvalue),Math.round(parseInt(windvalue))); 
          });
        });
        // validating the rounded values of temperature summary
        summary.findElement(By.xpath("//span[3]/span")).then(function(temperaturesummary){
          temperaturesummary.getAttribute("innerText").then(function(temperaturevalue){
            console.log('temperature value',parseInt(temperaturevalue));
            return assert.equal(parseInt(temperaturevalue),Math.round(parseInt(temperaturevalue)));
          });
        });
      });
    });
  }); 
return true;

});
Then(/^I should see the error message (.*)$/, function (value) {
  var selector = this.driver.findElement(By.xpath("//div[text()='"+value+"']"));
  selector.isDisplayed().then(function(value){
  return assert.equal(value,true);
  });
});

Then(/^I should see the summarized view of current weather condtion of the day$/,function () {
  var weatherSummary;
  this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[1]/span[2]/*")).then(function(condsummary){
       return condsummary.getAttribute("aria-label").then(function(condsumvalue){
        weatherSummary = condsumvalue;
          return weatherSummary;
        }); 
      });

   this.driver.findElement(By.xpath("//div[@data-reactroot]/div/div[2]/div[1]/span[2]/*")).then(function(conddetails){
    return conddetails.getAttribute("aria-label").then(function(weatherdetails){
        console.log('Current weather condition is ',weatherdetails);
        console.log('Weather summary is ',weatherSummary);
        return assert.equal(weatherSummary,weatherdetails);
      }); 

    });
});
