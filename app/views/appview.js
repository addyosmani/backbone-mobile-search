define( ['jquery', 'backbone', 'utils', 'collections/photos','collections/results', 'views/photoList', 'views/resultList'],
        function( $, Backbone, utils, PhotoCollection, ResultCollection, PhotoList, ResultList ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";



            var AppView = Backbone.View.extend( {
                el: $( "#appview" ),

                initialize: function() {
                },
                events: {
                    "submit #queryForm" : "keyLoadResults",
                    "change #sortBy": "keyLoadResults",
                    "keydown #searchbox" : "handleKey"
                },

                setView: function( option ) {
                    if ( option == 'search' ) {

                        mobileSearch.utils.loadPrompt( "Loading results..." );
                        mobileSearch.utils.toggleNavigation( true );
                        this.resultView = new ResultList;
                    }
                    else {

                        mobileSearch.utils.loadPrompt( "Loading photo..." );
                        $( '#photo .ui-title' ).html( 'Photo view' );
                        this.photoView = new PhotoList;
                    }
                },

                handleKey : function( event ) {
                },

                keyLoadResults: function( event ) {
                    var query = $( '#searchbox' ).val();

                    if ( query ) {

                        var sort = $( '#sortBy' ).val(),
                        endpoint = mobileSearch.utils.queryConstructor( query, sort, 1 );
                        location.hash = endpoint;

                    }
                    else {
                        mobileSearch.utils.loadPrompt( 'Please enter a search query to continue' );
                    }
                    return false;
                }
            } );

            return AppView;
        } );

        /* Due to deep namespacing, these render helpers are currently necessary*/
        window.renderResults = function(){
            window.mobileSearch.views.appview.resultView.render();
        }

        window.renderPhoto = function(){
            window.mobileSearch.views.appview.photoView.render();
        }

