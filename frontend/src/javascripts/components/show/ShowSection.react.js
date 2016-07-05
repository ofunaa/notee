import React, {Component, PropTypes} from 'react'
var request = require('superagent');

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
                <p>slug:　{this.state.post.slug}</p>
                <p>status:　{this.state.post.status}</p>
                <p>seo_keyword:　{this.state.post.seo_keyword}</p>
                <p>seo_description:　{this.state.post.seo_description}</p>
            </div>
        );
    }

    _loadPost() {
        var url = "/notee/api/posts/" + this.props.params.id
        request.get(url, (err, res) => {
            this.setState({post: res.body.post});
        })
    }

};
