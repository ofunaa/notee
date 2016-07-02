import React from 'react';
import ReactDOM from 'react-dom';

import NoteeApp from './components/NoteeApp.react';

window.onload = function(){
    
    ReactDOM.render(
        <NoteeApp />, document.getElementById('react')
    );

}
