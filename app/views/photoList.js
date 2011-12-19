define( ['jquery', 'backbone', 'underscore','text!templates/photoview.html'],
        function( $, Backbone, _ , photoTemplate) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var PhotoList = Backbone.View.extend( {
                el: $( "#photoviewholder" ),

                initialize: function() {
                },

                renderList: function( collection ) {

                    var compiled_template = _.template(photoTemplate);

                    mobileSearch.utils.loadPrompt( "Loading photo..." );
                    $( '#photo .ui-title' ).html( 'Photo view' );
                    collection.photolist.el.html( compiled_template( { results: collection.models } ) );

                    setTimeout( function() {
                        collection.photolist.el.listview('refresh');
                    }, 0 );


                }
            } );

            return PhotoList;
        } );
