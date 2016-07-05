import React, {Component, PropTypes} from "react"
import { Link } from "react-router"

export default class Header extends Component {

    render() {
        return (
            <header id="header">
                <h1><Link to='/notee' >Notee</Link></h1>
            </header>
        );
    }


};
