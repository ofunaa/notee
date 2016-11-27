import React, {Component, PropTypes} from 'react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRowColumn} from 'material-ui/Table';

export default class AuthorityDeleteColumn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var deleteButton = function(model, now_user, deleteMethod){
            switch(model){
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
            }

        }

        return(
            <TableRowColumn>
                {deleteButton(this.props.modelName, this.props.now_user, this.props.deleteMethod)}
            </TableRowColumn>
        );
    }

};

