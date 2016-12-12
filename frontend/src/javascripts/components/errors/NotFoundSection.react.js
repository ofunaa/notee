import React, {Component, PropTypes} from 'react';

export default class NotFoundSection extends Component {

    render() {
        return(
            <div>
                <h2>Not Found</h2>
                <p>"{window.location.href}" is not found.</p>
            </div>
        );
    }
};

