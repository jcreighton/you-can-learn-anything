'use strict'

function walk( ast, fn ) {

  var stack = [ ast ], i, j, key, len, node, child

  for ( i = 0; i < stack.length; i += 1 ) {

    node = stack[ i ]

    fn( node )

    for ( key in node ) {

      child = node[ key ]

      if ( child instanceof Array ) {

        for ( j = 0, len = child.length; j < len; j += 1 ) {
          stack.push( child[ j ] )
        }

      } else if ( child != void 0 && typeof child.type === 'string' ) {

        stack.push( child )
      }
    }
  }
}


function walkStructure( ast, structure ) {

  var stack = [ ast ], i, j, key, len, node1, node2, child1, child2

  for ( i = 0; i < stack.length; i += 1 ) {

    node = stack[ i ]

    if (node.type !== structure[i]) {
      return false;
    }

    for ( key in node ) {

      child = node[ key ]

      if ( child instanceof Array ) {

        for ( j = 0, len = child.length; j < len; j += 1 ) {
          stack.push( child[ j ] )
        }

      } else if ( child != void 0 && typeof child.type === 'string' ) {

        stack.push( child )
      }
    }
  }

  return true;
}