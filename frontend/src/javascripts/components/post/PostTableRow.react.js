import React, {Component, PropTypes} from 'react'

// notee
import PostStore from '../../stores/PostStore';
import CategoryStore from '../../stores/CategoryStore';
import UserStore from '../../stores/UserStore';

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
        this.ajaxUserLoad = this.ajaxUserLoad.bind(this);
    }

    componentWillMount(){
        CategoryStore.loadCategory(this.props.post.category_id, this.ajaxCategoryLoad);
        PostStore.loadStatus(this.props.post.status, this.ajaxStatusLoad);
        UserStore.loadUser(this.props.post.user_id, this.ajaxUserLoad);
    }

    render() {

        var deletePost = this.props.deletePost;
        var delete_id = this.props.post.id;

        var date = new Date( this.props.post.published_at );
        var display_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        var myPostStyle = function(now_user_id, user_id){
            if(now_user_id == user_id){
                return {backgroundColor: "rgba(250,200,80,0.5)"};
            }
        }

        var editButtonLink = function(now_user, post){
            switch(now_user.role){
                case "writer":
                    if(now_user.id != post.user_id){
                        return (
                            <RaisedButton
                                label="no permit"
                                disabled={true} />
                        );
                    }

                    return (
                        <Link to={`/notee/posts/edit/${post.id}`} activeClassName="active">
                            <RaisedButton
                                label="edit"
                                primary={true} />
                        </Link>
                    );
                default:
                    return (
                        <Link to={`/notee/posts/edit/${post.id}`} activeClassName="active">
                            <RaisedButton
                                label="edit"
                                primary={true} />
                        </Link>
                    );
            }
        }

        var deleteButton = function(now_user, post){
            switch(now_user.role){
                case "writer":
                    if(now_user.id != post.user_id){
                        return (
                            <RaisedButton
                                label="no permit"
                                disabled={true}
                            />
                        );
                    }
                    return (
                        <RaisedButton
                            onClick={function(){deletePost(delete_id)}}
                            label="delete"
                            secondary={true}
                            disabled={false}
                        />
                    );
                default:
                    return (
                        <RaisedButton
                            onClick={function(){deletePost(delete_id)}}
                            label="delete"
                            secondary={true}
                            disabled={false}
                        />
                    );
            }
        }

        return(
            <TableRow style={myPostStyle(this.props.now_user.id, this.props.post.user_id)}>
                <TableRowColumn>{this.props.post.title}</TableRowColumn>
                <TableRowColumn>{this.state.category}</TableRowColumn>
                <TableRowColumn>{this.state.user.name}</TableRowColumn>
                <TableRowColumn>{this.state.status}</TableRowColumn>
                <TableRowColumn>{display_date}</TableRowColumn>
                <TableRowColumn>
                    {editButtonLink(this.props.now_user, this.props.post)}
                </TableRowColumn>
                <TableRowColumn>
                    {deleteButton(this.props.now_user, this.props.post)}
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

    ajaxUserLoad(user){
        if(!user){return false}
        this.setState({user: user});
    }


    
}
