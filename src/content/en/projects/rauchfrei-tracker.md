---
title: Smoke Free Tracker
date: 2025-04-06
featuredImage: /assets/img/20250406_rauchfrei-tracker_en.png
description: The [Smoke Free Tracker](https://rauch-frei.netlify.app/) is a webapp which, with a few personal settings, shows you how long you have not smoked and what you have achieved financially and health-wise.
tags:
  - webapp
  - webdev
  - 11ty
featured: true
weblink: https://rauch-frei.netlify.app/en
status: needs-review
---
I quit smoking on 22.12.2024. Such a project requires a lot of motivation and perseverance. The temptation of stress and boredom is still great today – more than three months after quitting.

When my mind goes crazy again and tries to persuade me, I take a look at my smoke-free app. Then I'm a little proud of the progress I've made. Be it about

- the growing number of smoke-free days achieved,
- the money saved or
- the level of health achieved.

 I don't want to undo this progress.

## Individual smoke-free settings

The web app is realized with the *Static Site Generator* [11ty](https://www.11ty.dev/) and with the help of some nice Github repositories:

- [countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)
- [decimal-point-and-thousand-separator](https://github.com/HthSolid/decimal-point-and-thousand-separator)

The data from both repos is required for a localized display of the amount of money. In the personal settings, the desired country and thus the fields

- Currency abbreviation
- thousands separator
- Decimal point (dot or comma)

automatically filled.

![Personal settings for smoke-free app. mobile screenshot.](../../../assets/img/20250406_rauchfrei-tracker_einstellungen.png)

### Calculate consumption and costs

To be able to calculate how long you have been smoke-free and how much money you have saved, you need

- the date since which you stopped smoking;
- the average number of cigarettes (or other smoking products) consumed;
- and the price per unit.

## Personal dashboard

Saving the personal settings results in the following dashboard:

![smoke-free dashboard. mobile screenshot.](../../../assets/img/20250406_rauchfrei-tracker_einstellungen.png)

The first two values (Streak and the amount saved) are probably self-explanatory at first glance. The health level is not and therefore links to the key of what the individual levels mean.

## Local data storage

Personal data is stored locally in *Local Storage*. They therefore do not leave the browser.

The downside of this (data protection) advantage is that the few settings are lost if the browser data is deleted. They are not available in another browser or on another device and must be re-entered.

In order to mitigate this negative point somewhat, I have considered a possible future feature in which the settings can be exported as a JSON file and imported again.
