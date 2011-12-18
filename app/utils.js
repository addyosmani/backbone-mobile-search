/**
 Perform a deferred jQuery request for results.
 @searchType: search or photo
 @ctx: the context handling the the results
 @query: the search query being looked up
 @sort: how the result set should be sorted
 @page: the page within the result set to be returned
 **/

define( ['jquery' ],
        function( $ ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            //"use strict";
            var utils = {};

            utils.dfdQuery = function( searchType, ctx, query, sort, page ) {
                var entries = null;
                page = (page == undefined) ? 1 : page;

                utils.loadPrompt( 'Querying Flickr API...' );

                $.when( utils.fetchResults( searchType, query, sort, page ) )
                        .then( $.proxy( function( response ) {

                            ctx.setCollection( searchType );


                            // The application can handle routes that come in
                            // through a bookmarked URL differently if needed
                            // simply check against bookmarkMode
                            /*
                            if(!mobileSearch.routers.workspace.bookmarkMode){
                            }*/


                            if ( searchType == 'search' || searchType == undefined ) {

                                entries = response.photos.photo;

                                mobileSearch.routers.workspace.q = query;
                                mobileSearch.routers.workspace.p = page;
                                mobileSearch.routers.workspace.s = sort;

                                $( '.search-meta p' ).html( 'Page: ' + response.photos.page + ' / ' + response.photos.pages );
                                
                                ctx.result_collection.reset( entries );

                                // switch to search results view
                                utils.changePage( "#search", "slide", false, false );

                                // update title
                                utils.switchTitle( query + ' ( Page ' + page + ' of ' + response.photos.total + ')' );

                            }
                            else {

                                entries = response.photo;
                                ctx.photo_collection.reset( entries );
                                utils.changePage( "#photo", "slide", false, false );
                                 
                            }

                }, ctx ) );
            };

            utils.changePage = function( pageID, effect, p1, p2 ) {
                $.mobile.changePage( pageID, { transition: effect, reverse:p1, changeHash: p2} );
            };

            /**
             Search service for querying search results or individual photos
             query is either the search term or photo_id
             **/
            utils.fetchResults = function( searchType, query, sort, page ) {


                var serviceUrl = "http://api.flickr.com/services/rest/?format=json&jsoncallback=?",
                        apiKey = "8662e376985445d92a07c79ff7d12ff8",
                        geoTagged = null,
                        quantity = 0,
                        safeSearch = '',
                        minDate = "",
                        maxDate = "";


                if ( searchType == 'search' || searchType == undefined ) {

                    quantity = $( '#slider' ).val() || mobileSearch.defaults.resultsPerPage;

                    maxDate = utils.dateFormatter( $( '#date-max' ).val() ) || "";
                    minDate = utils.dateFormatter( $( '#date-min' ).val() ) || "";

                    minDate = "",maxDate = "";

                    ($( '#geo-choice-z1' ).prop( 'checked' ) || mobileSearch.defaults.geoTagged) ? geoTagged = 0 : geoTagged = 1;
                    page = (page == undefined) ? 0 : page;
                    sort = (sort == undefined) ? ($( '#sortBy' ).val()) : sort;
                    serviceUrl += "&method=flickr.photos.search" + "&per_page=" + quantity + "&page=" + page + "&is_geo=" + geoTagged + "&safe_search=" + safeSearch + "&sort=" + sort + "&min_taken_date=" + minDate + "&max_taken_date=" + maxDate + "&text=" + query + "&api_key=" + apiKey;

                } else if ( searchType == 'photo' ) {
                    serviceUrl += "&method=flickr.photos.getInfo&photo_id=" + query + "&api_key=" + apiKey;
                }

                return $.ajax( serviceUrl, { dataType: "json" } );
            };

            utils.dateFormatter = function ( date ) {
                date = $.datepicker.formatDate( '@', new Date( date ) );
                date = (date == undefined) ? '' : date;
                return date;
            };

            /**
             Manages URL construction for pagination
             @state: next or prev
             **/
            utils.historySwitch = function( state ) {
                var sortQuery,
                    hashQuery = "", pageQuery = 0, increment = 0;
                (mobileSearch.routers.workspace.q == undefined) ? hashQuery = '' : hashQuery = mobileSearch.routers.workspace.q;
                (mobileSearch.routers.workspace.p == undefined) ? pageQuery = 1 : pageQuery = mobileSearch.routers.workspace.p;
                (mobileSearch.routers.workspace.s == undefined) ? sortQuery = 'relevance' : sortQuery = mobileSearch.routers.workspace.s;

                pageQuery = parseInt( pageQuery );
                (state == 'next') ? pageQuery += 1 : pageQuery -= 1;

                (pageQuery < 1) ? utils.changePage( "/", "slide" ) : location.hash = utils.queryConstructor( hashQuery, sortQuery, pageQuery );

            };


            /**
             Display a custom notification message
             @message: the message to display
             **/
            utils.loadPrompt = function( message ) {
                message = (message == undefined) ? "" : message;

                $( "<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + message + "</h1></div>" )
                .css( { "display": "block", "opacity": 0.96, "top": $( window ).scrollTop() + 100 } )
                .appendTo( $.mobile.pageContainer )
                .delay( 800 )
                .fadeOut( 400, function() {
                    $( this ).remove();
                } );
                
            };


            /**
             Change the title of the search view
             @title: the title to be used
             **/
            utils.switchTitle = function( title ) {
                $( '.ui-title' ).text( title );
            };


            /**
             Construct the complete search query for passing to dfdQuery later.
             **/
            utils.queryConstructor = function( query, sortType, pageNum ) {
                return 'search/' + query + '/s' + sortType + '/p' + pageNum;
            };


            /**
             Toggle whether the navigation is displayed or hidden
             @b: boolean value specifying whether to show or hide the controls
             **/
            utils.toggleNavigation = function( b ) {
                mobileSearch.ui.nextOption.toggle( b ),
                        mobileSearch.ui.prevOption.toggle( b );
            };

            return utils;
        } );




