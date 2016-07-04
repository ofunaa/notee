import React, {Component, PropTypes} from "react"
import {Link} from "react-router"

export default class Header extends Component {

    render() {
        return (
            <header id="header">
                <h1>Notee</h1>
                <Link to="./" >index</Link>
                <Link to="edit" >edit</Link>
                <Link to="show" >show</Link>

            </header>
        );
    }


};
