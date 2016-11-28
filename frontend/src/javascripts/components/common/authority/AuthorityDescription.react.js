import React, {Component, PropTypes} from 'react';

export default class AuthorityDescription extends Component {

    render() {
        const role_desription = function(can_or_not, role){
            if(can_or_not == "can"){
                switch(role){
                    case "writer":
                        return [
                            "Create: posts, categories, images",
                            "Update: my posts, categories, images, my user without role",
                            "Delete: my posts"]
                    case "editor":
                        return [
                            "Create: posts, categories, images",
                            "Update: posts, categories, images, my user without role",
                            "Delete: posts, categories, images"]
                    case "manager":
                        return [
                            "Create: posts, categories, images, users",
                            "Update: posts, categories, images, users",
                            "Delete: posts, categories, images, users"]
                    case "root":
                        return [
                            "Create: users",
                            "Update: none",
                            "Delete: none"]
                    case "suspended":
                        return [
                            "Create: none",
                            "Update: none",
                            "Delete: none"]
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
                    case "suspended":
                        return [
                            "Create: posts, categories, images, users",
                            "Update: posts, categories, images, users",
                            "Delete: posts, categories, images, users"]
                }
            }
        }

        var can_do_list = [];
        var can_does = role_desription("can", this.props.role);
        for(var i in can_does){
            can_do_list.push(<li key={i}>{can_does[i]}</li>);
        }

        var can_not_do_list = [];
        var can_not_does = role_desription("cannot", this.props.role);
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
    }

};

