import React, {Component, PropTypes} from "react"

export default class NoteeFooter extends Component {

    render() {

        var style = {
            footer: {
                main: {
                    width: "100%",
                    height: "60px",
                    float: "left",
                    color: "white",
                    backgroundColor: "#424242",
                    textAlign: "center",
                    zIndex: "1102",
                    position: "relative"
                }
            }
        }

        return (
            <footer style={style.footer.main}>
                <p>Notee created by <a href="https://github.com/funaota">funaota</a></p>
            </footer>
        );
    }

}
