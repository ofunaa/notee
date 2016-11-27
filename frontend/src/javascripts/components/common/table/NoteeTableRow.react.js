import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';

// material-ui
import {TableRow, TableRowColumn} from 'material-ui/Table';

// components
import AuthorityEditColumn from '../authority/AuthorityEditColumn.react';
import AuthorityDeleteColumn from '../authority/AuthorityDeleteColumn.react';

export default class NoteeTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: []};

        this.setContent = this.setContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);

    }

    componentDidMount() {
        this.setContent();
    }

    render() {
        return(
            <TableRow>
                {this.state.contents.map((content, index)=>{
                    return (
                        <TableRowColumn key={index}>{content}</TableRowColumn>
                    );
                })}
                
                <AuthorityEditColumn
                    modelName={this.props.modelName}
                    now_user={this.props.now_user}
                    content={this.state.contents}
                />
                <AuthorityDeleteColumn
                    modelName={this.props.modelName}
                    now_user={this.props.now_user}
                    deleteMethod={this.deleteContent}
                />
            </TableRow>
        );
    }

    setContent(){
        var arr = [];
        var tmp_contents = this.props.content;
        this.props.columns.map((column)=>{
            var content = "tmp_contents." + column;
            arr.push(eval(content));
        })

        this.setState({contents: arr});
    }

    deleteContent(e){
        this.props.actions.delete(this.props.content.id);
    }
}
