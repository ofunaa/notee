import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// actions
import CategoryActions from '../../actions/CategoryActions';

// stores
import CategoryStore from '../../stores/CategoryStore';
import UserStore from '../../stores/UserStore';

// components
import CategoryForm from './CategoryForm.react';
import NoteeTable from '../commons/table/NoteeTable.react';

// constants
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';
import EventUtil from '../../utils/EventUtil';

export default class CategorySection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            now_user: ""
        };

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // callback
        this.changeSuccessed = this.changeSuccessed.bind(this);

    }

    componentWillMount() {
        CategoryStore.loadCategories(this.ajaxLoaded);
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
    }

    componentDidMount() {
        EventUtil.addChangeListener(Constants.CATEGORY_CREATE, this.changeSuccessed);
        EventUtil.addChangeListener(Constants.CATEGORY_UPDATE, this.changeSuccessed);
        EventUtil.addChangeListener(Constants.CATEGORY_DELETE, this.changeSuccessed);
    }

    componentWillUnmount(){
        EventUtil.removeChangeListener(Constants.CATEGORY_CREATE, this.changeSuccessed);
        EventUtil.removeChangeListener(Constants.CATEGORY_UPDATE, this.changeSuccessed);
        EventUtil.removeChangeListener(Constants.CATEGORY_DELETE, this.changeSuccessed);
    }

    ajaxLoaded(content){
        this.setState({categories: content});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    render() {

        AuthorityUtil.checkAuthority("CategorySection", this.state.now_user);

        return (
            <div class="main">
                <CategoryForm
                    categories={this.state.categories}
                    now_user={this.state.now_user}
                />
                <NoteeTable
                    modelName="Category"
                    columns={['id', 'name', 'slug', 'parent_id', 'is_private']}
                    contents={this.state.categories}
                    actions={CategoryActions}
                />
            </div>
        );
    }

    changeSuccessed(){
        CategoryStore.loadCategories(this.ajaxLoaded);
    }
    
};
