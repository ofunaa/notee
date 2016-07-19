import React, {Component, PropTypes} from 'react'

// notee
import NoteeStore from '../../stores/NoteeStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {status: ""}

        this.ajaxStatusLoad = this.ajaxStatusLoad.bind(this);
    }

    componentWillMount(){
        NoteeStore.loadStatus(this.props.notee.status, this.ajaxStatusLoad);
    }

    render() {

        var date = new Date( this.props.notee.updated_at );
        var display_date = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        return(
            <TableRow>
                <TableRowColumn>{this.props.notee.title}</TableRowColumn>
                <TableRowColumn>{this.props.notee.category_id}</TableRowColumn>
                <TableRowColumn>{this.state.status}</TableRowColumn>
                <TableRowColumn>{display_date}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/edit/${this.props.notee.id}`} activeClassName="active">
                        <RaisedButton
                        label="edit"
                        primary={true} /></Link>
                </TableRowColumn>
            </TableRow>
        );
    }

    ajaxStatusLoad(status){
        if(!status){return false}
        this.setState({status: status});
    }
}
