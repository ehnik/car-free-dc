import _ from 'lodash';

"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App.js'

ReactDOM.render(
  <App/>,
  document.getElementById("root")
)

//if (module.hot) {
//   module.hot.accept('./components/MapContainer.js', function() {
//     console.log('Accepting the updated printMe module!');
//   })
//}
