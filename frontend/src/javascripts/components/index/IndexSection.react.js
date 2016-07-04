import React, {Component, PropTypes} from 'react'
var request = require('superagent');

export default class IndexSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this._loadPosts();
    }

    componentWillUnmount() {
        this._loadPosts();
    }

    render() {

        return (
            <div id="list">
                {this.state.posts.map((post, index)=>{

                    return(
                        <div key={index} >
                            <p>_________________________</p>
                            <p>title:　{post.title}</p>
                            <p>slug:　{post.slug}</p>
                            <p>status:　{post.status}</p>
                            <p>seo_keyword:　{post.seo_keyword}</p>
                            <p>seo_description:　{post.seo_description}</p>
                            <p>{post.id}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    _loadPosts() {
        request.get('/notee/api/posts', (err, res) => {
            this.setState({posts: res.body.posts});
        })
    }

};
