import React, {Component} from 'react';
import blessed from 'blessed';
import {render} from 'react-blessed';

import { Parser as OrgaParser } from 'orga';
import chalk from 'chalk';
var fs = require('fs');

import { Markdown } from 'react-blessed-contrib';
var _ = require('lodash');


export function orgfile_to_renderloop(filename) {

var contents = fs.readFileSync(filename, 'utf8');

function rand_recur (structure) {
    if (structure && (structure.level < 4 || structure.type == 'root')) {
        return rand_recur(_.sample(structure.children))
    } else {
        // console.log(structure)
        return structure;
    }
}



function recur_stringify(obj) {
    var cache = [];
    return JSON.stringify(obj,
                          function(key, value) {
                              if (typeof value === 'object' && value !== null) {
                                  if (cache.indexOf(value) !== -1) {
                                      // Circular reference found, discard key
                                      return;
                                  }
                                  // Store value in our collection
                                  cache.push(value);
                              }
                              return value;
                          }
                         )

}

// console.log(rand_recur(new OrgaParser().parse(contents)))

// Rendering a simple centered box
// class App extends Component {
//   render() {
//     return (
//             <box
//         top="center"
//         left="center"
//         width="80%"
//         height="100%"

//         border={{type: 'line'}}
//         style={{border: {fg: 'blue'}}}>
//             { recur_stringify(rand_recur(new OrgaParser().parse(contents)))  }
//         </box>
//     );
//   }
// }

// class App extends Component {
//   componentDidMount() {
//     this.refs.markdown.widget.setMarkdown('<b>Hello \n Testing `refs`.</b>');
//   }

//   render() {
//     return (
//       <box>
//         <Markdown style={{firstHeading: chalk.red.italic}}>{'# Hello \n This is **markdown** printed in the `terminal` 11'}</Markdown>
//         <Markdown ref="markdown" top={3} style={{firstHeading: chalk.blue}} markdown={'# Hello \n This is **markdown** printed in the `terminal` 11'} />
//       </box>
//     );
//   }
// }

// class App extends Component {
//   render() {
//       const node = rand_recur(new OrgaParser().parse(contents))
//       const items = _.map(node.children, recur_stringify)

//     return (
//       <element>
//         <list
//         label= {node.value}
//           class={{
//             border: { type: 'line'},
//             style: { border: { fg: 'blue' } },
//           }}
//           width="50%"
//           height="50%"
//           left="25%"
//           top="25%"
//           style={{
//             item: { fg: 'black' },
//             selected: { fg: 'white', bg: 'black' },
//           }}
//         clickable={true}
//         keys={true}
//         items={ items }
//         onSelect={ () => console.error('selected') }
//         />
//       </element>
//     );
//   }
// }


// // Creating our screen
// const screen = blessed.screen({
//   autoPadding: true,
//   smartCSR: true,
//   title: 'react-blessed hello world'
// });

// // Adding a way to quit the program
// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//   return process.exit(0);
// });

// // Rendering the React app using our screen
// const component = render(<App />, screen);

    const node = rand_recur(new OrgaParser().parse(contents))
    console.log(recur_stringify(node))
}
