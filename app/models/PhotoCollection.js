define( ['jquery', 'backbone', 'models/ResultEntry', 'views/photoList'],
        function( $, Backbone, ResultEntry, PhotoList ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";


            var PhotoCollection = Backbone.Collection.extend( {
                model: ResultEntry,
                initialize: function() {
                    this.photolist = new PhotoList;
                    this.bind( "reset", this.photolist.renderList );
                }
            } );

            return PhotoCollection;
        } );
