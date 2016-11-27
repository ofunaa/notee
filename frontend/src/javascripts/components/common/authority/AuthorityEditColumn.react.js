import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import {TableRowColumn} from 'material-ui/Table';

// utils
import pluralize from 'pluralize';

export default class AuthorityEditColumn extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var editButtonLink = function(model, now_user, content){
            switch(model) {
                case "Category":
                    switch (now_user.role) {
                        case "root":
                            return (
                                <RaisedButton
                                    label="no permit"
                                    disabled={true}/>
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
                    }
            }

            // default
            return (
                <Link to={`/notee/${pluralize(model).toLowerCase()}/edit/${content.id}`} activeClassName="active">
                    <RaisedButton
                        label="edit"
                        primary={true} />
                </Link>
            );
        }

        return(
            <TableRowColumn>
                {editButtonLink(this.props.modelName, this.props.now_user, this.props.content)}
            </TableRowColumn>
        );
    }

};

