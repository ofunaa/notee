import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// notee
import UserStore from '../../stores/UserStore';
import UserTable from './UserTable.react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: []
		}

		this.ajaxLoaded = this.ajaxLoaded.bind(this);
	}

	componentWillMount() {
		UserStore.loadAllUsers(this.ajaxLoaded);
	}

	ajaxLoaded(contents) {
		this.setState({users: contents});
	}

	render() {
		return (
			<div id="list">
				<Link to={`/notee/user/new`} activeClassName="active">
					<RaisedButton label="NEW User!!" primary={true} />
				</Link>
				<UserTable users={this.state.users} ajaxLoad={this.ajaxLoaded} />
			</div>
		);
	}
}
