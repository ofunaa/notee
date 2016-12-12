import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// utils
import pluralize from 'pluralize';

export default class AuthorityButtonEdit extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var editButtonLink = function(model, now_user, content){

            if(!now_user){return;}

            switch(model) {
                case "Post":
                    switch (now_user.role) {
                        case "writer":
                            if(now_user.id != content.user_id){
                                return (
                                    <RaisedButton
                                        label="no permit"
                                        disabled={true} />
                                );
                            }

                            return (
                                <Link to={`/notee/${pluralize(model).toLowerCase()}/edit/${content.id}`} activeClassName="active">
                                    <RaisedButton
                                        label="edit"
                                        primary={true} />
                                </Link>
                            );
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}/>
                            );
                        default:
                            return (
                                <Link to={`/notee/${pluralize(model).toLowerCase()}/edit/${content.id}`} activeClassName="active">
                                    <RaisedButton
                                        label="edit"
                                        primary={true} />
                                </Link>
                            );
                    }
                case "Category":
                    switch (now_user.role) {
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}/>
                            );
                        default:
                            return (
                                <Link to={`/notee/${pluralize(model).toLowerCase()}/edit/${content[0]}`} activeClassName="active">
                                    <RaisedButton
                                        label="edit"
                                        primary={true} />
                                </Link>
                            );
                    }
                case "User":
                    switch (now_user.role) {
                        case "writer":
                        case "editor":
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}/>
                            );
                        default:
                            return (
                                <Link to={`/notee/${pluralize(model).toLowerCase()}/edit/${content[0]}`} activeClassName="active">
                                    <RaisedButton
                                        label="edit"
                                        primary={true} />
                                </Link>
                            );
                    }
            }

        }

        return(
            <div>
                {editButtonLink(this.props.modelName, this.props.now_user, this.props.content)}
            </div>
        );
    }

};

