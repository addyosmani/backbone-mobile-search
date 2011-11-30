/*need to be included in the namespace*/
define( ['jquery', 'utils' ],
        function( $, utils ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var ui = {};
            ui.nextOption = $( '#nextSet' ),
                    ui.prevOption = $( '#prevSet' );

            ui.nextOption.bind( 'click', function( e ) {
                e.preventDefault();
                utils.historySwitch( 'next' );
            } );

            ui.prevOption.bind( 'click', function( e ) {
                e.preventDefault();
                utils.historySwitch( 'prev' );
            } );

            return ui;
        } );