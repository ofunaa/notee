import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import IndexTableRow from './IndexTableRow.react'

export default class IndexTable extends Component {

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
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Category</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>UPDATE</TableHeaderColumn>
                        <TableHeaderColumn>/</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.props.notees.map((notee)=>{
                        return (<IndexTableRow
                            notee={notee}
                            ajaxLoad={this.props.ajaxLoad}
                            key={notee.id} />);
                    })}
                </TableBody>
            </Table>
        );
    }
}
