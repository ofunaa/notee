import React, {Component, PropTypes} from "react"
import { Link } from "react-router"

export default class Header extends Component {

    render() {

        var style = {
            header: {
                main: {
                    width: "100%",
                    height: "auto",
                    float: "left",
                }
            }
        }

        return (
            <header style={style.header.main}>
                <h1><Link to='/notee' >Notee</Link></h1>
            </header>
        );
    }


};
