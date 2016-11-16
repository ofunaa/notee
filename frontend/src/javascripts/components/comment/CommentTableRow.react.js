import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

// notee
import PostStore from '../../stores/PostStore';
import CommentActions from '../../actions/CommentActions';

export default class CommentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post_title: ""
        }

        this.ajaxLoad = this.ajaxLoad.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentWillMount(){
        PostStore.loadPost(this.props.comment.post_id, this.ajaxLoad);
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn>{this.state.post_title}</TableRowColumn>
                <TableRowColumn>{this.props.comment.name}</TableRowColumn>
                <TableRowColumn>{this.props.comment.email}</TableRowColumn>
                <TableRowColumn>{this.props.comment.content}</TableRowColumn>
                <TableRowColumn>{this.props.comment.is_hidden ? "hidden" : "public"}</TableRowColumn>

                <TableRowColumn>
                    <RaisedButton
                        onClick={this.updateComment}
                        label={this.props.comment.is_hidden ? "Show" : "Hide"}
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

    ajaxLoad(post){
        if(!post){return false}
        this.setState({post_title: post.title});
    }

    updateComment(e){
        CommentActions.update(this.props.comment.id);
    }

    deleteComment(e){
        CommentActions.delete(this.props.comment.id);
    }


}
