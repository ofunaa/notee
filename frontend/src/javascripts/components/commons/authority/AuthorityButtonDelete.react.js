import React, {Component, PropTypes} from 'react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class AuthorityButtonDelete extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var deleteButton = function(model, now_user, deleteMethod, content){
            switch(model){
                case "Post":
                    switch(now_user.role){
                        case "writer":
                            if(now_user.id != content.user_id) {
                                return (
                                    <RaisedButton
                                        label="no permit"
                                        disabled={true}
                                    />
                                );
                            }
                            return (
                                <RaisedButton
                                    onClick={function(){deleteMethod(content.id)}}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={function(){deleteMethod(content.id)}}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
                case "Category":
                    switch(now_user.role){
                        case "writer":
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={deleteMethod}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
                case "User":
                    switch(now_user.role){
                        case "writer":
                        case "editor":
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={deleteMethod}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
                case "Image":
                    switch(now_user.role){
                        case "writer":
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}
                                />
                            );
                        default:
                            return (
                                <RaisedButton
                                    onClick={deleteMethod}
                                    label="delete"
                                    secondary={true}
                                    disabled={false}
                                />
                            );
                    }
            }

        }

        return(
            <div>
                {deleteButton(
                    this.props.modelName,
                    this.props.now_user,
                    this.props.deleteMethod,
                    this.props.content
                )}
            </div>
        );
    }

};

