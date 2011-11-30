define( ['jquery', 'backbone', 'underscore'],
        function( $, Backbone, _ ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";


            var ResultList = Backbone.View.extend( {
                el: $( "#listviewholder" ),

                initialize: function() {
                },

                renderList: function( collection ) {

                    var compiled_template = _.template( $( "#listviewul" ).html() );

                    mobileSearch.utils.loadPrompt( "Loading results..." );

                    mobileSearch.utils.toggleNavigation( true );

                    collection.resultlist.el.html( compiled_template( { results: collection.models } ) );

                    setTimeout( function() {
                        var $search = $( '#search' );
                        //$search.find("ul").listview();
                        $search.find( "ul" ).listview( "refresh" );
                    }, 10 );


                }
            } );

            return ResultList;
        } );


