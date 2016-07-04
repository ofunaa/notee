import React from 'react'

var Preview = React.createClass({
    render() {
        var content = this.props.content;
        return(
            <div id="preview">
                <h3>Preview</h3>
                <p>_________________________</p>
                <p>title:　{content.title}</p>
                <p>content:　{content.content}</p>
                <p>slug:　{content.slug}</p>
                <p>status:　{content.status}</p>
                <p>seo_keyword:　{content.seo_keyword}</p>
                <p>seo_description:　{content.seo_description}</p>
            </div>
        );
    }
});

module.exports = Preview;
