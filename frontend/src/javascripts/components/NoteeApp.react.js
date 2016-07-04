import React from 'react'
import Header from './layout/Header.react'
import Footer from './layout/Footer.react'

var NoteeApp  = React.createClass({

    render: function() {

        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    },

});

module.exports = NoteeApp;
