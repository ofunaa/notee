import React, {Component, PropTypes} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var date = new Date( this.props.notee.updated_at );
        var display_date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        return(
            <TableRow>
                <TableRowColumn>{this.props.notee.title}</TableRowColumn>
                <TableRowColumn>{this.props.notee.category_id}</TableRowColumn>
                <TableRowColumn>{this.props.notee.status}</TableRowColumn>
                <TableRowColumn>{display_date}</TableRowColumn>
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
