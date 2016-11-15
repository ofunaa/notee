import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

// notee
import CommentActions from '../../actions/CommentActions';

export default class CommentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post_title: ""
        }

        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }


    render() {
        
        var hidden_btn;
        
        if(this.props.comment.is_hidden){
            hidden_btn = "show this!";
        }else{
            hidden_btn = "hide this";
        }

        return(
            <TableRow>
                <TableRowColumn>{this.props.comment.post_id}</TableRowColumn>
                <TableRowColumn>{this.state.post_title}</TableRowColumn>
                <TableRowColumn>{this.props.comment.name}</TableRowColumn>
                <TableRowColumn>{this.props.comment.email}</TableRowColumn>
                <TableRowColumn>{this.props.comment.content}</TableRowColumn>
                <TableRowColumn>{"hidden?:" + this.props.comment.is_hidden}</TableRowColumn>

                <TableRowColumn>
                    <RaisedButton
                        onClick={this.updateComment}
                        label={hidden_btn}
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
        if(this.props.comment.is_hidden)
        CommentActions.update(this.props.comment.id);
    }

    deleteComment(e){
        CommentActions.delete(this.props.comment.id);
    }


}
