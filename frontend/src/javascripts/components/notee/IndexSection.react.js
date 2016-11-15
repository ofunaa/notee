import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import NoteeStore from '../../stores/NoteeStore';
import NoteeActions from '../../actions/NoteeActions';
import IndexTableRow from './IndexTableRow.react';
import Constants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class IndexSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notees: []
        }

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.returnTableRow = this.returnTableRow.bind(this);
    }

    componentDidMount() {
        NoteeStore.addChangeListener(Constants.NOTEE_DELETE, this.changeSuccessed);
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
                <NoteeTable
                    modelName="Post"
                    columns={['title', 'category', 'status', 'published_at']}
                    contents={this.state.notees}
                    store={NoteeStore}
                    actions={NoteeActions}
                    ajaxLoad={this.ajaxLoaded}
                    returnTableRow={this.returnTableRow}
                />
            </div>
        );
    }

    returnTableRow(notee){
        return (
            <IndexTableRow
                notee={notee}
                ajaxLoad={this.state.ajaxLoad}
                key={notee.id} />
        );
    }

    changeSuccessed(){
        NoteeStore.loadAllNotees(this.ajaxLoaded);
    }

};
