import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from "react-router"

import Header from './components/layout/Header.react'
import Footer from './components/layout/Footer.react'
import IndexSection from './components/index/IndexSection.react.js'
import EditSection  from './components/edit/EditSection.react.js'
import ShowSection  from './components/show/ShowSection.react.js'


export default class NoteeApp extends React.Component {
    render () {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
};

const routes = (
    <Route path='notee' component={NoteeApp} >
        <Route path='new' component={EditSection} />
        <Route path='edit/:id' component={EditSection} />
        <Route path='show/:id' component={ShowSection} />
        <IndexRoute component={IndexSection}/>
    </Route>
);

window.onload = function(){
    ReactDOM.render(
        <Router history={browserHistory} routes={routes} />,
        document.getElementById('react')
    )
}
