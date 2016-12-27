import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';

// material-ui
import {TableRow, TableRowColumn} from 'material-ui/Table';

// components
import AuthorityButtonEdit from '../authority/AuthorityButtonEdit.react.js';
import AuthorityButtonDelete from '../authority/AuthorityButtonDelete.react.js';

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

                    if (content != null){content = content.toString();}
                    return (
                        <TableRowColumn key={index}>{content}</TableRowColumn>
                    );
                })}
                <TableRowColumn>
                    <AuthorityButtonEdit
                        modelName={this.props.modelName}
                        now_user={this.props.now_user}
                        content={this.state.contents}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <AuthorityButtonDelete
                        modelName={this.props.modelName}
                        now_user={this.props.now_user}
                        deleteMethod={this.deleteContent}
                    />
                </TableRowColumn>
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
