import React, {Component, PropTypes} from 'react'

// notee
import PostStore from '../../stores/PostStore';
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
            status: "",
            user: ""
        }

        this.ajaxCategoryLoad = this.ajaxCategoryLoad.bind(this);
        this.ajaxStatusLoad = this.ajaxStatusLoad.bind(this);
    }

    componentWillMount(){
        CategoryStore.loadCategory(this.props.post.category_id, this.ajaxCategoryLoad);
        PostStore.loadStatus(this.props.post.status, this.ajaxStatusLoad);
    }

    render() {

        var deletePost = this.props.deletePost;
        var delete_id = this.props.post.id;

        var date = new Date( this.props.post.published_at );
        var display_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        return(
            <TableRow>
                <TableRowColumn>{this.props.post.title}</TableRowColumn>
                <TableRowColumn>{this.state.category}</TableRowColumn>
                <TableRowColumn>{this.props.post.user_id}</TableRowColumn>
                <TableRowColumn>{this.state.status}</TableRowColumn>
                <TableRowColumn>{display_date}</TableRowColumn>
                <TableRowColumn>
                    <Link to={`/notee/posts/edit/${this.props.post.id}`} activeClassName="active">
                        <RaisedButton
                        label="edit"
                        primary={true} /></Link>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={function(){deletePost(delete_id)}}
                        label="delete"
                        secondary={true}
                        disabled={false}
                    />
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
