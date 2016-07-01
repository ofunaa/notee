import React from 'react';
import ReactDOM from 'react-dom';

import NoteeApp from './components/NoteeApp.react';

window.onload = function(){

    let appNode = document.createElement('div');
    document.body.appendChild(appNode);

    ReactDOM.render(
        <NoteeApp />, appNode
    );

}
