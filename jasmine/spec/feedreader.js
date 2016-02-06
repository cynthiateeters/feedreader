/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('for each URL is defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed).toBeDefined();
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });

        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('for each name is defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed).toBeDefined();
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });

        });
    });

    /* Test suite named 'The menu' */

    describe('The menu', function () {

        /*
         * A test that ensures the menu element is
         * hidden by default.
         *
         * Uses Jasmine-jQuery's set of custom matchers for jQuery framework
         *
         * https://github.com/velesin/jasmine-jquery
         */
        it('element is hidden by default', function () {
            expect($('body')).toHaveClass('menu-hidden');
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         *
         * To reveal the left-slider menu, the class menu-hidden on the body
         * element should be 1) removed on click and then 2) put back on next click.
         */
        it('element toggles visibility on click of its icon', function () {
            var menuIcon = '.menu-icon-link';
            var spyEvent = spyOnEvent(menuIcon, 'click');

            //
            // 1) check a) click triggered and b) menu-hidden is removed
            //
            $(menuIcon).click();
            expect('click').toHaveBeenTriggeredOn(menuIcon);
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body')).not.toHaveClass('menu-hidden');

            //
            // 2) check a) click triggered and b) menu-hidden is put back
            //
            // Note: if you comment out this second test set,
            // you can see the menu open on the above test and
            // stay open. Why do I find that cool?
            //
            spyEvent.reset();
            spyEvent = spyOnEvent(menuIcon, 'click');
            $(menuIcon).click();
            expect('click').toHaveBeenTriggeredOn(menuIcon);
            expect(spyEvent).toHaveBeenTriggered();
            expect($('body')).toHaveClass('menu-hidden');
        });

    });

    /* Test suite named 'Initial Entries' */
    describe('Initial Entries', function () {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //
        //The only thing we need to do to identify that this setup step is
        // asynchronous is add a done argument to its function definition.
        //
        //Calls to beforeEach can take an optional single argument that
        // should be called when the async work is complete.
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // check that at least one entry exists
        it('should complete and contain at least one entry.', function () {
            expect($('.entry')).toExist();
        });

    });
    /* Test suite named 'New Feed Selection'
     */

    /* Ensure when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * The call to loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function () {

        if (allFeeds.length < 2) {
            alert('Oops, we need two or more Feeds to test the "New Feed Selection" functionality');
        } else {

            // save html from a loadFeed

            beforeEach(function (done) {
                loadFeed(0, function () {
                    previousFeedHtml = $('.feed').html();
                    done();
                });
            });

            // then call loadFeed with a different feed and compare the new html to what was saved
            it('should change content when new feed is loaded', function (done) {
                loadFeed(1, function () {
                    // the compare should be different
                    expect($('.feed')).not.toHaveHtml(previousFeedHtml);
                    done();
                });
            });

        }

    });

    /*
     * A test suite that checks if entries are displayed on the page
     * with title and contentSnippet
     */

    describe('AJAX results', function () {
        // setup before test
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Inside an <article> element, each title is to be placed between a <h2></h2> element
        // So, check if they are there after loadFeed completes
        it('for each entry should return a title', function () {
            // create a temporary array to hold text appearing between <h2></h2>
            var entries = [];

            //console.log($('article').find('h2').first().html());
            $('article').find('h2').each(function (index) {
                //console.log( index + ': ' + $( this ).text() );
                entries.push($(this).text());
            });

            // now check that arry for non-empty strings
            entries.forEach(function (entry) {
                expect(entry).not.toBe('');
            });
        });

        /*
        *
        */

        // setup again before test
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Inside an <article> element, each contentSnippet is to be placed between a <p></p>
        // element.
        // So, check if they are there after loadFeed completes
        xit('for each entry should return a contentSnippet', function () {
            // create a temporary array to hold text appearing between <p><p>
            var entries = [];

            //console.log($('article').find('h2').first().html());
            $('article').find('p').each(function (index) {
                //console.log( index + ': ' + $( this ).text() );
                entries.push($(this).text());
            });

            // now check that arry for non-empty strings
            entries.forEach(function (entry) {
                expect(entry).not.toBe('');
            });
        });
    });
}());
