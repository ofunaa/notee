import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import NoteeTableRow from './NoteeTableRow.react.js'

// props
// columns: ['id', 'slug', ...]
// contents: this.state.categories(array)
// store: CategoryStore
// actions: CategoryActions
// ajaxLoaded: this.ajaxCategoryLoaded

// props-option
// returnTableRow <- originalTableRow // default -> NoteeTableRow
// buttonNum default -> 2

export default class NoteeTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var btnNum = this.props.buttonNum == null ? 2 : this.props.buttonNum;
        var btnColumns = [];
        for (var i = 0; i < btnNum; i++) {
            btnColumns.push(<TableHeaderColumn key={i}>/</TableHeaderColumn>);
        }

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
                        {btnColumns}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.contents.map((content)=>{
                        if(this.props.returnTableRow == null){
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
                        }else{
                            return(this.props.returnTableRow(content));
                        }
                    })}
                </TableBody>
            </Table>
        );
    }
}
