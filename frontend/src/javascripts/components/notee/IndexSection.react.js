import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import NoteeStore from '../../stores/NoteeStore';
import IndexTable from './IndexTable.react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';


export default class IndexSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notees: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentWillMount() {
        NoteeStore.loadAllNotees(this.ajaxLoaded);
    }

    ajaxLoaded(contents) {
        this.setState({notees: contents});
    }

    render() {

        return (
            <div id="list">
                <Link to={`/notee/new`} activeClassName="active">
                    <RaisedButton label="NEW Notee!!" primary={true} />
                </Link>
                <IndexTable notees={this.state.notees} ajaxLoad={this.ajaxLoaded} />
            </div>
        );
    }

};