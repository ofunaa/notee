import React, {Component, PropTypes} from 'react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class AuthorityButtonDelete extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(){
        if(!this.props.now_user){return false;}
        return true;
    }

    render() {

        var deleteButton = function(model, now_user, deleteMethod){
            switch(model){
                case "Category":
                    switch(now_user.role){
                        case "writer":
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
                {deleteButton(this.props.modelName, this.props.now_user, this.props.deleteMethod)}
            </div>
        );
    }

};

