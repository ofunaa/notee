import React from 'react'
import marked from 'marked'
import highlight from 'highlight.js'

marked.setOptions({
    sanitize: false,
    langPrefix : 'hljs lang-',
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

var Preview = React.createClass({

    componentWillReceiveProps(){
        var preview = document.getElementById('preview');
        preview.innerHTML = marked(this.props.content.content);
    },

    render() {
        var style = {
            preview: {
                main: {
                    width: "44%",
                    height: "96%",
                    position: "fixed",
                    maxWidth: "48%",
                    marginRight: "1%",
                    marginLeft: "1%",
                    padding: "2%",
                    top: "0px",
                    right: "0px",
                    overflowY: "scroll",
                    wordWrap: "break-word",
                    zIndex: "10000",
                    backgroundColor: "#333"
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
                <h1 style={style.preview.p}>{content.title}</h1>

                <p style={style.preview.p}>content:</p>
                <div id="preview" class="preview"></div>
            </div>
        );
    }
});

module.exports = Preview;
