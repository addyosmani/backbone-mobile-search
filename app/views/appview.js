define( ['jquery', 'backbone', 'utils', 'models/ResultCollection', 'models/PhotoCollection'],
        function( $, Backbone, utils, ResultCollection, PhotoCollection ) {
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

                setCollection: function( option ) {
                    if ( option == 'search' ) {
                        this.result_collection = new ResultCollection;
                    }
                    else {
                        this.photo_collection = new PhotoCollection;
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





