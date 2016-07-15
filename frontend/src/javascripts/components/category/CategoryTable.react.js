import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import CategoryTableRow from './CategoryTableRow.react'

export default class CategoryTable extends Component {

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
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Slug</TableHeaderColumn>
                        <TableHeaderColumn>PARENT_ID</TableHeaderColumn>
                        <TableHeaderColumn>STATUS</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.categories.map((category)=>{
                        return (
                            <CategoryTableRow
                                category={category}
                                ajaxLoad={this.props.ajaxLoad}
                                key={category.id}
                                displaySnackBar={this.props.displaySnackBar} />
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}
