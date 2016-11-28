import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class AuthorityButtonCreate extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var createButton = function(model, now_user, createMethod){
            switch(model){
                case "Post":
                    switch(now_user.role){
                        case "root":
                        case "suspended":
                            return (
                                <RaisedButton
                                    label="can't create"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <Link to={`/notee/posts/new`} activeClassName="active">
                                    <RaisedButton label="NEW Notee!!" primary={true} />
                                </Link>
                            );
                    }
                case "Category":
                    switch(now_user.role){
                        case "root":
                        case "suspended":
                            return (
                                <RaisedButton
                                    className="mb_15"
                                    style={{float: "right"}}
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    className="mb_15"
                                    style={{float: "right"}}
                                    onClick={createMethod}
                                    label="create"
                                    primary={true}
                                    disabled={false}
                                />
                            );
                    }
                case "User":
                    switch(now_user.role){
                        case "writer":
                        case "editor":
                        case "root":
                        case "suspended":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={createMethod}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
                case "Image":
                    switch(now_user.role){
                        case "root":
                        case "suspended":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={createMethod}
                                    label="Upload"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
            }

        }

        return(
            <div>
                {createButton(this.props.modelName, this.props.now_user, this.props.createMethod)}
            </div>
        );
    }

};

