import React from 'react'
import marked from 'marked'

var Preview = React.createClass({

    componentWillReceiveProps(){
        var preview = document.getElementById('preview');
        preview.innerHTML = marked(this.props.content.content);
    },

    render() {
        var style = {
            preview: {
                main: {
                    width: "48%",
                    height: "100%",
                    position: "fixed",
                    maxWidth: "48%",
                    marginRight: "1%",
                    marginLeft: "1%",
                    top: "0px",
                    right: "0px",
                    overflow: "scroll"
                },
                p: {
                    width: "100%",
                }
            }
        }

        var content = this.props.content;

        return(
            <div style={style.preview.main}>
                <h3>Preview</h3>
                <p style={style.preview.p}>title:</p>
                <p style={style.preview.p}>{content.title}</p>

                <p style={style.preview.p}>content:</p>
                <div id="preview"></div>
            </div>
        );
    }
});

module.exports = Preview;
