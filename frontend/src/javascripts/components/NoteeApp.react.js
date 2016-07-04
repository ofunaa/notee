import React from 'react'
import Header from './layout/Header.react'
import Footer from './layout/Footer.react'

var request = require('superagent');
var BlogStore = require('../stores/BlogStore');

function getBlogState() {
    return {
        preview_items: BlogStore.getPreview()
    };
}

var NoteeApp  = React.createClass({

    getInitialState: function() {
        return {
            posts: [],
            preview_items: []
        };
    },

    componentDidMount: function() {
        this._loadPosts();
        BlogStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        this._loadPosts();
        BlogStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getBlogState());
    },

    _loadPosts: function() {
        request.get('/notee/api/posts', (err, res) => {
            this.setState({posts: res.body.posts});
        })
    }
});

module.exports = NoteeApp;
