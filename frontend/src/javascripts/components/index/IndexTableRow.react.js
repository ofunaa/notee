import React, {Component, PropTypes} from 'react'

// notee
import NoteeStore from '../../stores/NoteeStore';
import CategoryStore from '../../stores/CategoryStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from "react-router";

export default class IndexTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: "",
            status: ""
        }

        this.ajaxCategoryLoad = this.ajaxCategoryLoad.bind(this);
        this.ajaxStatusLoad = this.ajaxStatusLoad.bind(this);
    }

    componentWillMount(){
        CategoryStore.loadCategory(this.props.notee.category_id, this.ajaxCategoryLoad);
        NoteeStore.loadStatus(this.props.notee.status, this.ajaxStatusLoad);
    }

    render() {

        var date = new Date( this.props.notee.published_at );
        console.log(date);
        var display_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        return(
            <TableRow>
                <TableRowColumn>{this.props.notee.title}</TableRowColumn>
                <TableRowColumn>{this.state.category}</TableRowColumn>
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

    ajaxCategoryLoad(category){
        if(!category){return false}
        this.setState({category: category.name});
    }

    ajaxStatusLoad(status){
        if(!status){return false}
        this.setState({status: status});
    }
}
