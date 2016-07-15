import React, {Component, PropTypes} from 'react'

// notee
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import NoteeConstants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';


export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentDidMount() {
        NoteeStore.addChangeListener(NoteeConstants.CATEGORY_DELETE, this.deleteSuccessed);
        NoteeStore.addChangeListener(NoteeConstants.CATEGORY_DELETE_FAILED, this.deleteFailed);
    }

    render() {
        return(
            <TableRow>
                <TableRowColumn>{this.props.category.id}</TableRowColumn>
                <TableRowColumn>{this.props.category.name}</TableRowColumn>
                <TableRowColumn>{this.props.category.slug}</TableRowColumn>
                <TableRowColumn>{this.props.category.parent_id}</TableRowColumn>
                <TableRowColumn>{this.props.category.status}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteCategory}
                        label="delete"
                        secondary={true} />
                </TableRowColumn>
            </TableRow>
        );
    }

    deleteCategory(e){
        NoteeActions.category_delete(this.props.category.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete Category!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! delete Failed..!");
    }
}
