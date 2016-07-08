var React = require('react');

var Footer = React.createClass({

    render: function() {

        var style = {
            footer: {
                main: {
                    width: "100%",
                    height: "60px",
                    float: "left",
                }
            }
        }

        return (
            <footer style={style.footer.main}>
                <p>created by maru-3</p>
            </footer>
        );
    },
    
});

module.exports = Footer;
