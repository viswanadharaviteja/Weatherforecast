Feature: Display the 5 day weather forecast of the selected place

  Scenario Outline: To verify 5 days weather forecast is displayed for the city entered.

    Given I launch the weather forecast page
    When I enter the city name as <cityname>
    Then I should see the weather forecast data for five days

    Examples:
    | cityname  |
    | edinburgh |
    | aberdeen |
    | dundee |
    | perth |
    | stirling |
    | glasgow |

  Scenario Outline: To verify only 5 days weather forecast is displayed for the city entered.

    Given I launch the weather forecast page
    When I enter the city name as <cityname>
    Then I should not see the weather forecast data for more than five days

    Examples:
    | cityname  |
    | edinburgh |
    | aberdeen |
    | dundee |
    | perth |
    | stirling |
    | glasgow |

Scenario Outline: To verify the application displays 3 hourly forecast on selecting a day.

    Given I launch the weather forecast page
    When I enter the city name as <cityname>
    Then I should see the weather forecast data for five days
    When I select day <day>
    Then I should be able to see 3 hourly forecast for that day <day>

    Examples:
    | cityname  | day |
    | edinburgh |  5  |
    | aberdeen  |  1  |
    | dundee    |  3  |
    | perth     |  4  |
    | stirling  |  5  |
    | glasgow   |  2  |

Scenario Outline: To verify the application is hiding the 3 hourly forecast on selecting the same day again.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  When I select day <day>
  Then I should be able to see 3 hourly forecast for that day <day>
  When I select day <day>
  Then I should not be able to see 3 hourly forecast for that day

  Examples:
  | cityname  | day |
  | aberdeen  |  1  |
  
Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast of current weather condition.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  When I select day <day>
  Then I should be able to see 3 hourly forecast for that day <day>
  Then I should see the summarized view of current weather condtion of the day
  
  Examples:
  | cityname  | day |
  | edinburgh |  5  |
  | aberdeen  |  1  |
  | dundee    |  3  |
  | perth     |  4  |
  | stirling  |  5  |
  | glasgow   |  1  |

Scenario Outline:  To verify the application is showing the 3 hour data for daily forecast of wind speed.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  When I select day <day>
  Then I should be able to see 3 hourly forecast for that day <day>
  Then I should see the summarized view of most dominant wind speed of the day <day>
  
  Examples:
  | cityname  | day |
  | edinburgh |  5  |
  | aberdeen  |  1  |
  | dundee    |  3  |
  | perth     |  4  |
  | stirling  |  5  |
  | glasgow   |  1  |

Scenario Outline:  To verify the application is showing the 3 hour data for min and max temperatures of the day.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  When I select day <day>
  Then I should be able to see 3 hourly forecast for that day <day>
  Then I should see the summarized view of min and max temparture of the day <day>
  
  Examples:
  | cityname  | day |
  | edinburgh |  5  |
  | aberdeen  |  1  |
  | dundee    |  3  |
  | perth     |  4  |
  | stirling  |  5  |
  | glasgow   |  1  |

Scenario Outline:  To verify the application is showing the 3 hour data for aggregate rainfall.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  When I select day <day>
  Then I should be able to see 3 hourly forecast for that day <day>
  Then I should see the summarized view of Aggregate rainfall of the day <day>
  
  Examples:
  | cityname  | day |
  | edinburgh |  5  |
  | aberdeen  |  1  |
  | dundee    |  3  |
  | perth     |  4  |
  | stirling  |  5  |
  | glasgow   |  1  |


Scenario Outline:  To verify all the values displayed on the application are rounded off to the nearest value.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the weather forecast data for five days
  Then I should be able to see all values are rounded off
  
  Examples:
  | cityname  |
  | edinburgh |
  | aberdeen |
  | dundee |
  | perth |
  | stirling |
  | glasgow |

Scenario Outline:  To verify the error message displayed if city is incorrect.

  Given I launch the weather forecast page
  When I enter the city name as <cityname>
  Then I should see the error message <message>
  
  Examples:
  | cityname  |message|
  | India    |Error retrieving the forecast|
