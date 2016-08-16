import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

// notee
import CommentActions from '../../actions/CommentActions';
import CommentStore from '../../stores/CommentStore';
import CommentConstants from '../../constants/CommentConstants';

export default class CommentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post_title: ""
        }

        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        // eventemit_callback for comment
        this.updateSuccessed = this.updateSuccessed.bind(this);
        this.updateFailed = this.updateFailed.bind(this);
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentWillMount(){
        CommentStore.addChangeListener(CommentConstants.COMMENT_UPDATE, this.deleteSuccessed);
        CommentStore.addChangeListener(CommentConstants.COMMENT_UPDATE_FAILED, this.deleteFailed);
        CommentStore.addChangeListener(CommentConstants.COMMENT_DELETE, this.deleteSuccessed);
        CommentStore.addChangeListener(CommentConstants.COMMENT_DELETE_FAILED, this.deleteFailed);
    }

    render() {

        return(
            <TableRow>
                <TableRowColumn>{this.props.comment.post_id}</TableRowColumn>
                <TableRowColumn>{this.state.post_title}</TableRowColumn>
                <TableRowColumn>{this.props.comment.name}</TableRowColumn>
                <TableRowColumn>{this.props.comment.email}</TableRowColumn>
                <TableRowColumn>{this.props.comment.content}</TableRowColumn>

                <TableRowColumn>
                    <RaisedButton
                        onClick={this.updateComment}
                        label="hidden this"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteComment}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    updateComment(e){
        CommentActions.comment_update(this.props.comment.id);
    }

    deleteComment(e){
        CommentActions.comment_delete(this.props.comment.id);
    }

    updateSuccessed(){this.props.displaySnackBar("Hidden Comment!");}
    updateFailed(){this.props.displaySnackBar("Sorry..! Hiding Comment is Failed..!");}
    deleteSuccessed(){this.props.displaySnackBar("Delete Comment!");}
    deleteFailed(){this.props.displaySnackBar("Sorry..! Delete Failed..!");}

}
