import React from 'react'
import Header from './layout/Header.react'
import Footer from './layout/Footer.react'

import MainSection from './edit/MainSection.react'
import Preview from './edit/Preview.react'
import List from './index/List.react'

var BlogStore = require('../stores/BlogStore');

function getBlogState() {
    return {
        preview_items: BlogStore.getPreview()
    };
}

var NoteeApp  = React.createClass({

    getInitialState: function() {
        console.log(window.location.href);
        return getBlogState();
    },

    componentDidMount: function() {
        BlogStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <Header />
                <List />
                <Footer />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getBlogState());
    }
});

module.exports = NoteeApp;
