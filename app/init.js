/*!
 * Flickly - Backbone jQuery Mobile demo
 * http://addyosmani.com
 * Copyright (c) 2011 Addy Osmani
 * Dual licensed under the MIT and GPL licenses.
 *
 Initialize namespacing
 */

define( ['views/appview', 'router/workspace'],
        function( AppView, Workspace ) {

            var mobileSearch = mobileSearch || {};

            mobileSearch = {
                views: new AppView,
                routers:{
                    workspace:new Workspace()
                },
                utils:{},
                ui:{},
                defaults:{
                    resultsPerPage: 16,
                    safeSearch: 2,
                    maxDate:'',
                    minDate:'01/01/1970'
                }
            };

            mobileSearch.utils.toggleNavigation( false );
            Backbone.history.start();

        } );
