import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import NoteeTableRow from './NoteeTableRow.react.js'

// props
// columns: ['id', 'slug', ...]
// contents: this.state.categories(array)
// store: CategoryStore
// actions: CategoryActions
// ajaxLoaded: this.ajaxCategoryLoaded

export default class NoteeTable extends Component {

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
                        {this.props.columns.map((column, index)=>{
                            return (
                                <TableHeaderColumn key={index}>{column}</TableHeaderColumn>
                            );
                        })}
                        <TableHeaderColumn>/</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.contents.map((content)=>{
                        return (
                            <NoteeTableRow
                                key={content.id}
                                modelName={this.props.modelName}
                                columns={this.props.columns}
                                content={content}
                                store={this.props.store}
                                actions={this.props.actions}
                                ajaxLoad={this.props.ajaxLoad}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}
