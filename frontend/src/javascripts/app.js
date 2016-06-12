import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

window.onload = function(){

    let appNode = document.createElement('div');
    document.body.appendChild(appNode);

    ReactDOM.render(
        <App />, appNode
    );

}
