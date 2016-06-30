'use strict'

/**
 * Walks the AST tree with a callback at each Node
 * @function
 * @param {object} AST - The AST created by a parser
 * @param {function} fn - The function to be called for each Node
 */
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

/**
 * Walks the AST tree to determine a structure match
 * @function
 * @param {object} AST - The AST created by a parser
 * @param {array} structure - List of Node types that determine structure
 *    Ex. ['VariableDeclaration', 'FunctionDeclaration']
 */
function walkStructure( ast, structure ) {

  var stack = [ ast ], i, j, key, len, node, child

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

  return (stack.length === structure.length);
}