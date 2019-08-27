var seleniumWebdriver = require('selenium-webdriver');
var assert = require('assert');
const By = seleniumWebdriver.By

function tempdata(day,datadetails,driverd) {


    const daydetails = driverd.findElements(By.xpath("//div[@data-reactroot]/div"));

    console.log('daydetails',daydetails);

      switch (datadetails) {
        case 'details':
            var daytempdetails = daydetails[day].findElement(By.xpath(".//div[@class='details']"));
            var tempdetails = daytempdetails.findElements(By.xpath(".//div[@class='detail']/span[3]/span"));
            console.log('tempdetails',tempdetails.length);
         break;
        case 'summary':
            var daytempsummary =  daydetails[day].findElement(By.xpath(".//div[@class='summary']"));
            var tempsummary = daytempsummary.findElements(By.xpath(".//span[3]/span"));
            console.log('tempdetails',tempsummary.length);
          break;
        default:
          throw new Error(`Unsupported data request: ${datadetails}`);
      }
  }

  module.exports = {
    tempdata
  };
