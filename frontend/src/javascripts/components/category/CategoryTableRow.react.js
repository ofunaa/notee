import React, {Component, PropTypes} from 'react'

// notee
import CategoryActions from '../../actions/CategoryActions';
import CategoryStore from '../../stores/CategoryStore';
import Constants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from "react-router";


export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentDidMount() {
        CategoryStore.addChangeListener(Constants.CATEGORY_DELETE, this.deleteSuccessed);
        CategoryStore.addChangeListener(Constants.CATEGORY_DELETE_FAILED, this.deleteFailed);
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn>{this.props.category.id}</TableRowColumn>
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

                    {(()=>{
                        if(this.props.category.id == 1){
                            return(
                                <RaisedButton
                                    onClick={this.deleteCategory}
                                    label="delete"
                                    secondary={true}
                                    disabled={true}
                                />
                            );
                        }else{
                            return(
                                <RaisedButton
                                    onClick={this.deleteCategory}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                        }

                    })()}

                </TableRowColumn>
            </TableRow>
        );
    }

    deleteCategory(e){
        CategoryActions.category_delete(this.props.category.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete Category!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! Delete Failed..!");
    }
}
