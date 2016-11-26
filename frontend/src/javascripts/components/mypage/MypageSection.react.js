import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee_user
import UserStore from '../../stores/UserStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class UserShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                profile: "",
                profile_img: "",
                sns: "",
                role: ""
            }
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        UserStore.loadUserByToken(this.ajaxLoaded);
    }

    render() {

        const RoleDescription = function(role){

            var can_do_list = [];
            var can_does = role_desription("can", role);
            for(var i in can_does){
                can_do_list.push(<li key={i}>{can_does[i]}</li>);
            }

            var can_not_do_list = [];
            var can_not_does = role_desription("cannot", role);
            for(var i in can_not_does){
                can_not_do_list.push(<li key={i}>{can_not_does[i]}</li>);
            }

            return(
                <div className="role_description">
                    <h3>You can</h3>
                    {can_do_list}
                    <h3>You can't</h3>
                    {can_not_do_list}
                </div>
            );
        };

        const role_desription = function(can_or_not, role){
            if(can_or_not == "can"){
                switch(role){
                    case "writer":
                        return [
                            "Create: posts, categories, images",
                            "Update: my posts, categories, images, my user without role, comments",
                            "Delete: my posts, comments"]
                    case "editor":
                        return [
                            "Create: posts, categories, images",
                            "Update: posts, categories, images, my user without role, comments",
                            "Delete: posts, categories, images, comments"]
                    case "manager":
                        return [
                            "Create: posts, categories, images, users",
                            "Update: posts, categories, images, users, comments",
                            "Delete: posts, categories, images, users, comments"]
                    case "root":
                        return [
                            "Create: users",
                            "Update: none, comments",
                            "Delete: none, comments"]
                }
            }else{
                switch(role){
                    case "writer":
                        return [
                            "Create: users",
                            "Update: other's posts, other users, my user role",
                            "Delete: other's posts, categories, images, users"]
                    case "editor":
                        return [
                            "Create: users",
                            "Update: other users, my user role",
                            "Delete: users"]
                    case "manager":
                        return [
                            "Create: none",
                            "Update: none",
                            "Delete: none"]
                    case "root":
                        return [
                            "Create: posts, categories, images",
                            "Update: posts, categories, images, users",
                            "Delete: posts, categories, images, users"]
                }
            }


        }

        return(
            <div>
                <h2>Mypage</h2>
                <Link to={`/notee/mypage/edit`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Edit Profile" primary={true} />
                </Link>
                <Link to={`/notee/mypage/edit/password`} activeClassName="active" class="mr_20">
                    <RaisedButton label="Edit Password" primary={true} />
                </Link>
                <p>name:</p>
                <h3>{this.state.user.name}</h3>
                <p>email:</p>
                <h3>{this.state.user.email}</h3>
                <p>profile:</p>
                <h3>{this.state.user.profile}</h3>
                <p>profile_img:</p>
                <img src={window.location.origin + "/notee/profile/" + this.state.user.profile_img} />
                <p>role:</p>
                <h3>{this.state.user.role}</h3>
                {RoleDescription(this.state.user.role)}
            </div>
        );
    }

    ajaxLoaded(content){
        if(!content){return;}
        this.setState({
            user: {
                name: content.name,
                email: content.email,
                profile: content.profile,
                profile_img: content.profile_img,
                sns: content.sns,
                role: content.role
            }
        });
    }
};

