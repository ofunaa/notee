import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, IndexRoute, browserHistory} from "react-router"

import NoteeHeader from './components/layout/NoteeHeader.react.js'
import NoteeFooter from './components/layout/NoteeFooter.react.js'
import IndexSection from './components/index/IndexSection.react.js'
import EditSection  from './components/edit/EditSection.react.js'
import CategorySection  from './components/category/CategorySection.react.js'
import ImageSection  from './components/image/ImageSection.react.js'
import CommentSection  from './components/comment/CommentSection.react.js'
import UserSection  from './components/user/UserSection.react.js'
import UserEdit  from './components/user/UserEdit.react.js'
import UserShow  from './components/user/UserShow.react.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

export default class NoteeApp extends React.Component {
    render () {
        return (
            <div className="grid_start">
                <NoteeHeader />
                    <div className="ninety grid" style={{margin: "3%", padding: "2%"}}>
                    {this.props.children}
                    </div>
                <NoteeFooter />
            </div>
        );
    }
};

const routes = (
    <Route path='notee' component={NoteeApp} >
        <Route path='new' component={EditSection} />
        <Route path='edit/:id' component={EditSection} />

        <Route path='categories' component={CategorySection} />
        <Route path='images' component={ImageSection} />
        <Route path='comments' component={CommentSection} />

        <Route path='users' component={UserSection}>
            <Route path='new' component={UserEdit} />
            <Route path='edit/:id' component={UserEdit} />
            <Route path='show/:id' component={UserShow} />
        </Route>

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
