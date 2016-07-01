import React from 'react'

var Preview = React.createClass({
    render() {

        var preview_items = this.props.preview_items;

        return(
            <div id="preview">
                {preview_items.map((item, index) => {

                    return (
                        <div key={index}>
                            <p>_________________________</p>
                            <p>title:　{item.title}</p>
                            <p>content:　{item.content}</p>
                            <p>slug:　{item.slug}</p>
                            <p>status:　{item.status}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = Preview;
