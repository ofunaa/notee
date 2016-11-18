import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

// notee
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class UserSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			users: []
		}

		this.ajaxLoaded = this.ajaxLoaded.bind(this);

	}

	componentWillMount() {
		UserStore.loadUsers(this.ajaxLoaded);
	}

	ajaxLoaded(contents) {
		this.setState({users: contents});
	}

	render() {
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
