import React, {Component, PropTypes} from 'react'

// notee
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import UserConstants from '../../constants/UserConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class UserTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentWillMount(){
        UserStore.addChangeListener(UserConstants.USER_DELETE, this.deleteSuccessed);
        UserStore.addChangeListener(UserConstants.USER_DELETE_FAILED, this.deleteFailed);
    }

    render() {

        return(
            <TableRow>
                <TableRowColumn>{this.props.user.name}</TableRowColumn>
                <TableRowColumn>{this.props.user.email}</TableRowColumn>
                <TableRowColumn>{this.props.user.role}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/users/show/${this.props.user.id}`} activeClassName="active">
                        <RaisedButton
                        label="show"
                        primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/users/edit/${this.props.user.id}`} activeClassName="active">
                        <RaisedButton
                        label="edit"
                        primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteUser}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    deleteUser(){
        UserActions.delete(this.props.user.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete User!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! Delete Failed..!");
    }

}
