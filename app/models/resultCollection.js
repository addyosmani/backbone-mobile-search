define( ['jquery', 'backbone', 'models/resultentry', 'views/resultList'],
        function( $, Backbone, ResultEntry, ResultList ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var ResultCollection = Backbone.Collection.extend( {
                model: ResultEntry,
                parse: function( response ) {
                    return response;
                },
                initialize: function() {
                    this.resultlist = new ResultList;
                    this.bind( "reset", this.resultlist.renderList );
                }
            } );

            return ResultCollection;
        } );
            