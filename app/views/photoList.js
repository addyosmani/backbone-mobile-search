define( ['jquery', 'backbone', 'underscore', 'collections/photos', 'text!templates/photoview.html'],
        function( $, Backbone, _ , PhotoCollection, photoTemplate) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var PhotoList = Backbone.View.extend( {
                el: $( "#photoviewholder" ),

                initialize: function() {
                    this.collection = new PhotoCollection;
                    //this.render();
                },


                render: function() {

                    var compiledTemplate = _.template(photoTemplate, { results: this.collection.models });
                    this.el.html(compiledTemplate);
          
                    setTimeout( function() {
                        $('#photoviewholder').listview('refresh');
                    }, 0 );
                    


                }
            } );

            return PhotoList;
        } );
