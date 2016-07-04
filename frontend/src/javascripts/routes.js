import React from "react"
import {Route, IndexRoute} from "react-router"

import NoteeApp from "./components/NoteeApp.react"
import IndexSection from './components/index/IndexSection.react.js'
import EditSection  from './components/edit/EditSection.react.js'
import ShowSection  from './components/show/ShowSection.react.js'


export default (
    <Route path="/notee" component={NoteeApp} name="app">
        <Route path="/edit" component={EditSection} name="./edit" />
        <Route path="/show" component={ShowSection} name="./show" />
        <IndexRoute component={IndexSection} name="index" />
    </Route>
);
