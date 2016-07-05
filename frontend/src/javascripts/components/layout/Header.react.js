import React, {Component, PropTypes} from "react"
import {Link} from "react-router"

export default class Header extends Component {

    render() {
        return (
            <header id="header">
                <h1>Notee</h1>
                <Link to='/notee' >index</Link>
                <Link to='/notee/new' >new</Link>
                <Link to='/notee/edit/12' >edit</Link>
                <Link to='/notee/show/12' >show</Link>

            </header>
        );
    }


};
