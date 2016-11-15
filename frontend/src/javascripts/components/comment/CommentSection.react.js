import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// notee
import CommentStore from '../../stores/CommentStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        CommentStore.loadAllComments(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({comments: contents});
    }

    render() {
        return (
            <div id="list">
                <CommentTable comments={this.state.comments} />
            </div>
        );
    }
}
