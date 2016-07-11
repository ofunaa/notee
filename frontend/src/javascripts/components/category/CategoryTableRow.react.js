import React, {Component, PropTypes} from 'react'
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';

export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
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
        NoteeStore.loadAllCategories(this.props.ajaxLoad);
    }
}
