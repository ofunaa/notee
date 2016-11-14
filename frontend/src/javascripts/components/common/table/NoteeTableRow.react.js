import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from "react-router";


export default class NoteeTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentDidMount() {
        this.props.store.addChangeListener(this.props.constants.CATEGORY_DELETE, this.deleteSuccessed);
        this.props.store.addChangeListener(this.props.constants.CATEGORY_DELETE_FAILED, this.deleteFailed);
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn>{this.props.content.id}</TableRowColumn>
                <TableRowColumn>{this.props.category.name}</TableRowColumn>
                <TableRowColumn>{this.props.category.slug}</TableRowColumn>
                <TableRowColumn>{this.props.category.parent_id}</TableRowColumn>
                <TableRowColumn>{this.props.category.is_private}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/categories/edit/${this.props.category.id}`} activeClassName="active">
                        <RaisedButton
                            label="edit"
                            primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteContent}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    deleteContent(e){
        this.props.actions.category_delete(this.props.content.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete Category!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! Delete Failed..!");
    }
}
