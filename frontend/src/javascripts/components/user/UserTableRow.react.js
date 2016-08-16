import React, {Component, PropTypes} from 'react'

// notee
import UserStore from '../../stores/UserStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class UserTableRow extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount(){
    }

    render() {

        return(
            <TableRow>
                <TableRowColumn>{this.props.user.name}</TableRowColumn>
                <TableRowColumn>{this.props.user.email}</TableRowColumn>
                <TableRowColumn>{this.props.user.role}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/user/show/${this.props.user.id}`} activeClassName="active">
                        <RaisedButton
                        label="show"
                        primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/user/edit/${this.props.user.id}`} activeClassName="active">
                        <RaisedButton
                        label="edit"
                        primary={true} /></Link>
                </TableRowColumn>
            </TableRow>
        );
    }

}
