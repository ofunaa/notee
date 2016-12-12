import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// actions
import UserActions from '../../actions/UserActions';

// stores
import UserStore from '../../stores/UserStore';

// components
import NoteeTable from '../commons/table/NoteeTable.react';
import AuthorityButtonCreate from '../commons/authority/AuthorityButtonCreate.react.js';

// constants
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';
import EventUtil from '../../utils/EventUtil';

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

		// callback
		this.changeSuccessed = this.changeSuccessed.bind(this);

	}

	componentWillMount() {
		UserStore.loadUsers(this.ajaxLoaded);
		UserStore.loadUserByToken(this.ajaxNowUserLoaded);
	}

	componentDidMount() {
		EventUtil.addChangeListener(Constants.USER_DELETE, this.changeSuccessed);
	}

	componentWillUnmount(){
		EventUtil.removeChangeListener(Constants.USER_DELETE, this.changeSuccessed);
	}

	ajaxLoaded(contents) {
		this.setState({users: contents});
	}

	ajaxNowUserLoaded(content) {
		this.setState({now_user: content});
	}

	render() {

		AuthorityUtil.checkAuthority("UserSection", this.state.now_user);

		return (
			<div id="list">
				<AuthorityButtonCreate
					modelName="User"
					now_user={this.state.now_user}
				/>
				<NoteeTable
					modelName="User"
					columns={['id', 'name', 'email', 'role']}
					contents={this.state.users}
					actions={UserActions}
				/>
			</div>
		);
	}

	changeSuccessed(){
		UserStore.loadUsers(this.ajaxLoaded);
	}

}
