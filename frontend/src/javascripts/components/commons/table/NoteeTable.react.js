
///////////////////////////////////////////////////
//
//  NoteeTable.react.js
//
//  props:
//      columns: ['id', 'slug', ...]
//      contents: this.state.categories(array)
//      actions: CategoryActions
//
//  props-option:
//      returnTableRow <- originalTableRow // default -> NoteeTableRow
//      buttonNum default -> 2
//
///////////////////////////////////////////////////


import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import NoteeTableRow from './NoteeTableRow.react.js'

// stores
import UserStore from '../../../stores/UserStore';

export default class NoteeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            now_user: ""
        };

        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);
    }

    componentWillMount() {
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
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
                                    actions={this.props.actions}
                                    now_user={this.state.now_user}
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

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }
}
