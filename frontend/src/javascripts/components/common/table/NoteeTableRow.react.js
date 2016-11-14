import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Link } from 'react-router';

// utils
import pluralize from 'pluralize';


export default class NoteeTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: []};

        this.setContent = this.setContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);

        // eventemit_callback for category
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);
    }

    componentDidMount() {
        this.props.store.addChangeListener(this.props.constants.DELETE, this.deleteSuccessed);
        this.props.store.addChangeListener(this.props.constants.DELETE_FAILED, this.deleteFailed);
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
                <TableRowColumn>
                    <Link to={`/notee/${pluralize(this.props.modelName).toLowerCase()}/edit/${this.props.content.id}`} activeClassName="active">
                        <RaisedButton
                            label="edit"
                            primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.deleteContent}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    setContent(){
        var tmp_arr1 = [];
        var tmp_arr2 = this.props.content;
        this.props.columns.map((column)=>{
            var content = "tmp_arr2." + column;
            tmp_arr1.push(eval(content));
        })

        this.setState({contents: tmp_arr1});
    }

    deleteContent(e){
        this.props.actions.delete(this.props.content.id);
    }

    deleteSuccessed(){
        this.props.displaySnackBar("Delete Category!");
    }

    deleteFailed(){
        this.props.displaySnackBar("Sorry..! Delete Failed..!");
    }
}
