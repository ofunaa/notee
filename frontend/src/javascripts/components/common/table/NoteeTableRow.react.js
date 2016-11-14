import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from "react-router";


export default class NoteeTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteContent = this.deleteContent.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentDidMount() {
        this.props.store.addChangeListener(this.props.constants.DELETE, this.deleteSuccessed);
        this.props.store.addChangeListener(this.props.constants.DELETE_FAILED, this.deleteFailed);
    }

    render() {
        return(
            <TableRow>
                {this.props.columns.map((column)=>{
                    return (
                        <TableRowColumn>{eval("this.props.content." + column)}</TableRowColumn>
                    );
                })}
                <TableRowColumn>
                    <Link to={`/notee/categories/edit/${this.props.content.id}`} activeClassName="active">
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
        this.props.actions.delete(this.props.content.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete Category!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! Delete Failed..!");
    }
}
