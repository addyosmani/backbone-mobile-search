define( ['jquery', 'backbone', 'underscore','text!templates/listview.html'],
        function( $, Backbone, _, listTemplate ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";


            var ResultList = Backbone.View.extend( {
                el: $( "#listviewholder" ),

                initialize: function() {
                },

                renderList: function( collection ) {

                    var compiled_template = _.template( listTemplate );

                    mobileSearch.utils.loadPrompt( "Loading results..." );
                    mobileSearch.utils.toggleNavigation( true );
                    collection.resultlist.el.html( compiled_template( { results: collection.models } ) );

                    setTimeout( function() {
                       collection.resultlist.el.listview('refresh');
                    }, 0 );

                }
            } );

            return ResultList;
        });


