import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import UserTableRow from './UserTableRow.react'

export default class UserTable extends Component {

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
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.users.map((user)=>{
                        return (<UserTableRow
                            user={user}
                            ajaxLoad={this.props.ajaxLoad}
                            key={user.id} />);
                    })}
                </TableBody>
            </Table>
        );
    }
}
