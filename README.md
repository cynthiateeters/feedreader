## Project Overview

For this project I was given a web-based application that reads RSS feeds and outputs the feeds as lists that are clickable to the original blog webpage. The lists are found in a left-slider menu that slides open after its icon is clicked.

My task was to create a set of unit testing suites using the Jasmine BDD framework. To do that, I added tests to the file jasmine/spec/feedreader.js. The original version of this file contained ToDo items that specified what tests were to be completed.

### Install

1. Download the repository
2. Open index.html in a browser

### Test Environment Functionality

The top of the page shows output from the app and the bottom of the page shows the results of running the Jasmine tests.

### Additional Tests

Additionally, I have added 2 tests beyond what is required.

In studying the app's index.html file, I found that the app added the title and something called contentSnippet for each feed entry. While the title was being properly placed on the page, the \<p\>\</p\> element for the contentSnippet was being left empty. After more investigation, I believe the contentSnippet is a legacy from when the project used the Google API, which apparently was retired in December, 2015 and is no longer available.

The new API at https://rsstojson.udacity.com/parseFeed does not have a contentSnippet within its JSON. This is leading to the empty \<p\>\</p\> element. This, to me, is a bug in the code as it expects contentSnippet to exist.

My first test, checking to see if the title is put on the page, succeeds. The second test, checking if the contentSnippet is put on the page, fails for the reason explained above. If you would like to see all tests succeed, just uncomment line 72 in js/app.js as this line adds a dummy contentSnippet string to each entry.


### Additional Libraries

To complete the task, I included the library jasmine/lib/jasmine-jquery.js as a utility library. This library provides:

* a set of Jasmine custom matchers for the jQuery framework

which I made use of.


## Resources
[Testing DOM Events Using jQuery and Jasmine 2.0](http://www.htmlgoodies.com/beyond/javascript/js-ref/testing-dom-events-using-jquery-and-jasmine-2.0.html)

[Jasmine-Jquery](https://github.com/velesin/jasmine-jquery)
