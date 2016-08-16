import React, {Component, PropTypes} from 'react';

export default class UserShow extends Component {

    render() {
        var style = {
            preview: {
                main: {
                    width: "90%",
                    height: "86%",
                    position: "fixed",
                    maxWidth: "90%",
                    marginLeft: "2%",
                    padding: "3%",
                    overflowY: "scroll",
                    wordWrap: "break-word",
                    zIndex: "1101",
                    backgroundColor: "#fff"
                },
                p: {
                    width: "100%",
                }
            }
        }

        var content = this.props.content;

        return(
            <div style={style.preview.main}>
                <h3>User: </h3>
                <p style={style.preview.p}>title:</p>
                <h1 style={style.preview.p}>{content.title}</h1>

                <p style={style.preview.p}>content:</p>
                <div id="preview" class="preview"></div>
            </div>
        );
    }
};

