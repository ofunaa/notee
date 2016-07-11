import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn>{this.props.notee.title}</TableRowColumn>
                <TableRowColumn>{this.props.notee.updated_at}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/edit/${this.props.notee.id}`} activeClassName="active">
                        <RaisedButton
                        label="edit"
                        primary={true} /></Link>
                </TableRowColumn>
            </TableRow>
        );
    }
}
