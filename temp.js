var __p = [],print = function() {
    __p.push.apply( __p, arguments );
};
with ( obj || {} ) {
    __p.push( '\n ' );
    _.each( results, function( item, i ) {
        ;
        __p.push( '\n <li>\n <a class=\'ui-result\' title=\'', item.get( "title" ), '\' data-ajax="false" href="#photo/', item.get( " id" ), '">\n <img title="', item.get( " title" ), '" src="', 'http://farm' + item.get( "farm" ) + '.static.flickr.com/' +\n
        item.get( "server" ) + '/' + item.get( "id" ) + '_' + item.get( "secret" ) + '_s.jpg','"/>\n <h3>',item.get( "title" ),'</h3>\n\n <p></p> </a>\n </li>\n '
        )
        ;
    } );
    ;
    __p.push( '\n' );
}
return __p.join( '' );
"