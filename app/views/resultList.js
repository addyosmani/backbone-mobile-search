define( ['jquery', 'backbone', 'underscore','collections/results', 'text!templates/listview.html'],
        function( $, Backbone, _, ResultCollection, resultTemplate ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";


            var ResultList = Backbone.View.extend( {
                el: $( "#listviewholder" ),

                initialize: function() {
                    this.collection = new ResultCollection;
                    //this.render();
                },

                render: function() {

                    var compiledTemplate = _.template(resultTemplate, { results: this.collection.models });
                    this.el.html(compiledTemplate);
          
                    
                    setTimeout( function() {
                       $('#listviewholder').listview('refresh');
                    }, 0 );
                    

                }
            } );

            return ResultList;
        });


