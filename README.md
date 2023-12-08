# Gentrification in Seattle
Link to project: [https://aileenkuang.github.io/geog328-seattle-gentrification/index.html](https://aileenkuang.github.io/geog328-seattle-gentrification/index.html)

## Project Goals and Description

Gentrification is the process of neighborhood change resulting from young and/or affluent people moving into areas that have historically been home to marginalized communities. Because of this, community members are often forced to move, which leads to a loss of community, history, and culture. While this phenomenon has been occurring across the United States, it is especially relevant in Seattle because it is the third most quickly gentrifying city in the nation. In fact, Seattle’s Chinatown-International District – a neighborhood home to a vibrant AAPI community – was recognized as one of the eleven most endangered historic places in the country this year. 

In this project, I examine the process of gentrification in Seattle using construction and demolition permit data. Specifically, this project seeks to answer the following questions: **How has Seattle gentrified over the past decade (2011-2023)? What areas of Seattle have been the most affected by gentrification?** The aim of this project is to provide Seattle policymakers, activists, non-profits, and interested community members with information about gentrification occurring city-wide, which will ideally support these stakeholders in taking action on this issue.

## Data Sources and Cleaning

This project utilizes the [Built Units Since 2010 dataset](https://data-seattlecitygis.opendata.arcgis.com/datasets/SeattleCityGIS::built-units-since-2010/explore) from Seattle GeoData, which contains residential permits for building and demolition issued by the City of Seattle from 2010 (not-inclusive) to the current year (2023). This data set only includes completed permits; also, it has 19968 records, where each record lists the number of residential units constructed or demolished for each housing type in the project. It is possible for an individual building permit to appear multiple times, and for there to be multiple permits recorded for a single address. The housing unit types in this data set are static, meaning that they reflect the unit types that existed at the time that the permit was issued.

To access this data set, I downloaded it from the Seattle GeoData site as a GeoJSON. I then took multiple steps to clean this data in JavaScript. First, to remove clutter and decrease the file size of the data set, I removed feature properties that did not appear immediately relevant to my project (for example, permit numbers, urban village information, zoning information, inspection dates, etc.). Then, I began the process of removing duplicate entries – essentially, if there were multiple permits associated with one address with the same permit type, I deleted all but one entry for that address. Finally, to ensure that the data set could be used with the Mapbox template I was interested in, I converted the YEAR_FINAL column (which records the year that the permit was finalized) from a string to integer type. 

For this project, I created a custom base map with 2020 block groups in Seattle. The data for the block group boundaries was also accessed through Seattle GeoData and downloaded as a GeoJSON. I did not take any additional steps to clean this data. 

## Applied Base Maps and Libraries

This project utilizes the Mapbox GL JS API; it is built on the “Show changes over time” template provided by Mapbox. Also, through Mapbox Studio, I created a custom base map by adding a boundaries layer to and editing the color scheme of the Monochrome base map template.

## Project Development, Functions, & Findings

This project contains two maps: one displaying net demolished units in Seattle from 2011 to 2023 (Fig. 1), and one displaying net constructed units in Seattle from 2011 to 2023 (Fig. 2). There are two main interactive functions on this webpage; the user is able to toggle between the demolished and constructed units maps, and the user is able to utilize the slider in the console (located at the top left of the map) to display data for the year of their choice. Furthermore, the console contains a direct link to the data set used in the map as well as a map legend (which differs between the two maps).



From these maps, it can be seen that the number of both demolished and constructed units generally increases over time. Notably, the demolished units map shows us that there was a spike in demolitions from 2016-2017; after this, there seems to be a decrease in demolitions. On the other hand, the constructed units map demonstrates a continuous increase in built units over the past decade. Since we use demolition and construction as a signifier of gentrification, this suggests that Seattle has gentrified over the past decade. Moreover, in both maps, there seems to be a concentration of demolition and construction in the center of the city (around the Central District and downtown areas). The spatial distribution of demolished and constructed buildings shown here holds significance for community members and policymakers who are invested in the issue of gentrification. 

There are, of course, limitations to this visualization. First, the data set used only includes residential permits. This means that changes in commercial development in Seattle are not shown in this project; it is, however, a significant part of gentrification. Furthermore, due to the constraints of the map template and lack of available data, I was unable to add race and income data layers to these maps. This does not necessarily detract from the project itself, but it is information that would be useful for users. This may be something to address in the continued development of this project. 

## Acknowledgements

I would like to thank Dr. Bo Zhao for his guidance and support throughout this project. I would also like to acknowledge prior projects by the [Seattle Civil Rights and Labor History Project](https://depts.washington.edu/civilr/maps_race_seattle.htm), [Nil Tuzcu](https://www.niltuzcu.net/chinatown-mapping), and [Allen Yu, Juan Moreno, and Christiansen Mayo](https://storymaps.arcgis.com/stories/2f0792826dc14e0b99d04fc4c0142a3c) which provided inspiration for this project.