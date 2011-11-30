define( ['jquery', 'backbone', 'underscore'],
        function( $, Backbone, _ ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var PhotoList = Backbone.View.extend( {
                el: $( "#photoviewholder" ),

                initialize: function() {
                },

                renderList: function( collection ) {

                    var compiled_template = _.template( $( "#photoviewul" ).html() );

                    mobileSearch.utils.loadPrompt( "Loading photo..." );

                    $( '#photo .ui-title' ).html( 'Photo view' );

                    collection.photolist.el.html( compiled_template( { results: collection.models } ) );

                    setTimeout( function() {
                        //hack (note all the below are on purpose)
                        var $photo = $( '#photo' );
                        $photo.find( 'ul' ).listview();
                        $photo.find( 'ul' ).listview( "refresh" );
                    }, 0 );


                }
            } );

            return PhotoList;
        } );
