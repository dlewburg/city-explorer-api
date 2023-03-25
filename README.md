# City Explorer API

**Author**: Dasha Burgos
**Version**: 1.1.2 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

This is the server backend of the application that pulls the data from the API. The data is parsed through for relevant info that is displayed on the site. A location is chosen by user and based off that data, The weather and related movies display on the page.

## Getting Started

Getting started on the backend requires a separate repo from the frontend. A WRRC can be used to help outline what areas of the application will speak with the other. A separate repo should be created for the front end.

## Architecture

The backend uses Express for a server and Axios to get the data from the API. The APIs require keys that can be obtained from the website. The data is put into modules to keep the code try and easy to read. The parsed data is sent to the frontend for end-user use. The OnRender host the live server on the backend for the live site. This has been added to the main host of the site along with the API keys.

## Change Log

03-24-2023 The application is fully functional and the data uses Express.

## Credit and Collaborations

Audrey

Raul

Justin

Tony

Brandon

[Weather API](https://www.weatherbit.io/)

[Movie API](https://developers.themoviedb.org/3/movies/get-movie-details)

[Axios](https://axios-http.com/docs/api_intro)

[OnRender](https://render.com/)

## Time Estimates

### Feature #1: Performance

Estimate of time needed to complete: 1 hours

Start time: 2200

Finish time: 2300

Actual time needed to complete: 1 hour
