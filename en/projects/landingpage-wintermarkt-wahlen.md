---
aliases:
  - Landing page of the winter market in Wahlen
title: Landing page of the winter market in Wahlen
date: 2024-11-10T00:00:00.000Z
featuredImage: assets/img/20241110_landingpage-wintermarkt-wahlen.jpg
description: >-
  On 30.11.2024 the time has come and the winter market in Wahlen will take
  place again. I have redesigned the landing page and give you a few insights
  into the new features.
tags:
  - 11ty
  - webdev
  - webapp
featured: true
weblink: 'https://familienverein-wahlen/wahlner-wintermarkt'
status: done
---
The winter market is organized by the [[en/projects/family-association-wahlen|Familienverein Wahlen]]. The landing page is a subpage of the association.

## Snowflakes

As with the last version two years ago, the animated snowflakes could not be missing. This time, however, I used the Web Component [`<snow-fall>`](https://www.zachleat.com/web/snow-fall/) by Zach Leatherman. It now also snows down over the viewport and the flakes can be configured as desired.

## Stand Tracker

The market stalls are again listed in a horizontally scrollable table. The stalls that have already been visited can now be "ticked off". In addition to a competition, this is also a feature designed to encourage visitors to visit as many stands as possible.

The colored number in the first column is a button that saves a local cookie when clicked. The cookie is used to color the button green, to change the progress bar and the number in the info box via JavaScript.

With the help of an additional button above the table, either all stands or only those not yet visited can be displayed.

## Interactive map

The interactive map is displayed in the entire window and can be closed again with the X button at the top right.

I was able to solve the challenge of displaying it centered and scrolling in **all directions** with the help of Vesa Piittinen.

<blockquote class="mastodon-embed" data-embed-url="https://fosstodon.org/@stebre/113238647818889861/embed" style="background: #FCF8FF; border-radius: 8px; border: 1px solid #C9C4DA; margin: 0; max-width: 540px; min-width: 270px; overflow: hidden; padding: 0;"> <a href="https://fosstodon.org/@stebre/113238647818889861" target="_blank" style="align-items: center; color: #1C1A25; display: flex; flex-direction: column; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Roboto, sans-serif; font-size: 14px; justify-content: center; letter-spacing: 0.25px; line-height: 20px; padding: 24px; text-decoration: none;"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 79 75"><path d="M74.7135 16.6043C73.6199 8.54587 66.5351 2.19527 58.1366 0.964691C56.7196 0.756754 51.351 0 38.9148 0H38.822C26.3824 0 23.7135 0.756754 22.2966 0.964691C14.1319 2.16118 6.67571 7.86752 4.86669 16.0214C3.99657 20.0369 3.90371 24.4888 4.06535 28.5726C4.29578 34.4289 4.34049 40.275 4.877 46.1075C5.24791 49.9817 5.89495 53.8251 6.81328 57.6088C8.53288 64.5968 15.4938 70.4122 22.3138 72.7848C29.6155 75.259 37.468 75.6697 44.9919 73.971C45.8196 73.7801 46.6381 73.5586 47.4475 73.3063C49.2737 72.7302 51.4164 72.086 52.9915 70.9542C53.0131 70.9384 53.0308 70.9178 53.0433 70.8942C53.0558 70.8706 53.0628 70.8445 53.0637 70.8179V65.1661C53.0634 65.1412 53.0574 65.1167 53.0462 65.0944C53.035 65.0721 53.0189 65.0525 52.9992 65.0371C52.9794 65.0218 52.9564 65.011 52.9318 65.0056C52.9073 65.0002 52.8819 65.0003 52.8574 65.0059C48.0369 66.1472 43.0971 66.7193 38.141 66.7103C29.6118 66.7103 27.3178 62.6981 26.6609 61.0278C26.1329 59.5842 25.7976 58.0784 25.6636 56.5486C25.6622 56.5229 25.667 56.4973 25.6775 56.4738C25.688 56.4502 25.7039 56.4295 25.724 56.4132C25.7441 56.397 25.7678 56.3856 25.7931 56.3801C25.8185 56.3746 25.8448 56.3751 25.8699 56.3816C30.6101 57.5151 35.4693 58.0873 40.3455 58.086C41.5183 58.086 42.6876 58.086 43.8604 58.0553C48.7647 57.919 53.9339 57.6701 58.7591 56.7361C58.8794 56.7123 58.9998 56.6918 59.103 56.6611C66.7139 55.2124 73.9569 50.665 74.6929 39.1501C74.7204 38.6967 74.7892 34.4016 74.7892 33.9312C74.7926 32.3325 75.3085 22.5901 74.7135 16.6043ZM62.9996 45.3371H54.9966V25.9069C54.9966 21.8163 53.277 19.7302 49.7793 19.7302C45.9343 19.7302 44.0083 22.1981 44.0083 27.0727V37.7082H36.0534V27.0727C36.0534 22.1981 34.124 19.7302 30.279 19.7302C26.8019 19.7302 25.0651 21.8163 25.0617 25.9069V45.3371H17.0656V25.3172C17.0656 21.2266 18.1191 17.9769 20.2262 15.568C22.3998 13.1648 25.2509 11.9308 28.7898 11.9308C32.8859 11.9308 35.9812 13.492 38.0447 16.6111L40.036 19.9245L42.0308 16.6111C44.0943 13.492 47.1896 11.9308 51.2788 11.9308C54.8143 11.9308 57.6654 13.1648 59.8459 15.568C61.9529 17.9746 63.0065 21.2243 63.0065 25.3172L62.9996 45.3371Z" fill="currentColor"/></svg> <div style="color: #787588; margin-top: 16px;">Post by @stebre@fosstodon.org</div> <div style="font-weight: 500;">View on Mastodon</div> </a> </blockquote> <script data-allowed-prefixes="https://fosstodon.org/" async src="https://fosstodon.org/embed.js"></script>

## Homemade is the motto

The self-drawn, graphic elements of the winter market were created by my wife **Dominique**.

![Drawn map with the stands marked as markers. Screenshot.](assets/img/20241110_landingpage-wintermarkt-wahlen-map.jpg)

The map could be used in a modified form from the last winter market.

![The first sponsor logos. Screenshot](assets/img/20241110_landingpage-wintermarkt-wahlen-sponsoren.jpg)

All sponsor logos have been redrawn.

![Front page of the winter market booklet](assets/img/20241110_landingpage-wintermarkt-wahlen-heft.jpg)

The main picture of the winter market adorns the winter market booklet and the flyer.
