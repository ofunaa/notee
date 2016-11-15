import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import CommentTableRow from './CommentTableRow.react'

export default class CommentTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Table
                className="mt_20"
                style={{overflow: "scroll"}}
                selectable={false}
                fixedHeader={true}>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>PostID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Content</TableHeaderColumn>
                        <TableHeaderColumn>Hidden</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.comments.map((comment)=>{
                        return (<CommentTableRow comment={comment} key={comment.id} />);
                    })}
                </TableBody>
            </Table>
        );
    }
}
