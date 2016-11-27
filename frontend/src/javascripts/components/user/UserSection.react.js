import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// actions
import UserActions from '../../actions/UserActions';

// stores
import UserStore from '../../stores/UserStore';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// components
import NoteeTable from '../common/table/NoteeTable.react';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			now_user: ""
		}

		// ajax
		this.ajaxLoaded = this.ajaxLoaded.bind(this);
		this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

	}

	componentWillMount() {
		UserStore.loadUsers(this.ajaxLoaded);
		UserStore.loadUserByToken(this.ajaxNowUserLoaded);
	}

	ajaxLoaded(contents) {
		this.setState({users: contents});
	}

	ajaxNowUserLoaded(content) {
		this.setState({now_user: content});
	}

	render() {

		// AuthorityUtil.checkAuthority("UserSection", this.state.now_user);

		return (
			<div id="list">
				<Link to={`/notee/users/new`} activeClassName="active">
					<RaisedButton label="NEW User!!" primary={true} />
				</Link>
				<NoteeTable
					modelName="User"
					columns={['name', 'email', 'role']}
					contents={this.state.users}
					actions={UserActions}
				/>
			</div>
		);
	}

}
