import React, {Component, PropTypes} from 'react'
import marked from 'marked'
import highlight from 'highlight.js'
var request = require('superagent');

marked.setOptions({
    sanitize: false,
    langPrefix : 'hljs lang-',
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

export default class ShowSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        this._loadPost();
    }

    render() {
        
        return (
            <div id="preview">
                <h3>Preview</h3>
                <p>_________________________</p>
                <p>title:　{this.state.post.title}</p>
                <p>content:　{this.state.post.content}</p>
                <div id="preview"></div>
            </div>
        );
    }

    _loadPost() {
        var url = "/notee/api/posts/" + this.props.params.id
        request.get(url, (err, res) => {
            this.setState({post: res.body.post});
            var preview = document.getElementById('preview');
            preview.innerHTML = marked(this.state.post.content);
        })
    }

};
