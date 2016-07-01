import React from 'react'
import Header from './layout/Header.react'
import Footer from './layout/Footer.react'

import MainSection from './edit/MainSection.react'
import Preview from './edit/Preview.react'

var BlogStore = require('../stores/BlogStore');

function getBlogState() {
    return {
        preview_items: BlogStore.getPreview()
    };
}

var NoteeApp  = React.createClass({

    getInitialState: function() {
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
                <MainSection />
                <Preview preview_items={this.state.preview_items}/>
                <Footer />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getBlogState());
    }
});

module.exports = NoteeApp;
