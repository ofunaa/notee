import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from "react-router"

import NoteeHeader from './components/layout/NoteeHeader.react.js'
import NoteeFooter from './components/layout/NoteeFooter.react.js'
import IndexSection from './components/index/IndexSection.react.js'
import EditSection  from './components/edit/EditSection.react.js'
import CategorySection  from './components/category/CategorySection.react.js'
import ImageSection  from './components/image/ImageSection.react.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

export default class NoteeApp extends React.Component {
    render () {
        return (
            <div>
                <NoteeHeader />
                {this.props.children}
                <NoteeFooter />
            </div>
        );
    }
};

const routes = (
    <Route path='notee' component={NoteeApp} >
        <Route path='new' component={EditSection} />
        <Route path='edit/:id' component={EditSection} />
        <Route path='category' component={CategorySection} />
        <Route path='image' component={ImageSection} />
        <IndexRoute component={IndexSection}/>
    </Route>
);

window.onload = function(){
    ReactDOM.render(
        <MuiThemeProvider>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>,
        document.getElementById('react')
    )
}
