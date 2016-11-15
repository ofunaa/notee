import React, {Component, PropTypes} from 'react';

// notee
import CategoryStore from '../../stores/CategoryStore';
import CategoryActions from '../../actions/CategoryActions';

// material-ui
import { Link } from "react-router";
import CategoryForm from './CategoryForm.react';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';


export default class CategorySection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        // ajax
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);

        // eventemit
        this.changeSuccessed = this.changeSuccessed.bind(this);

    }

    componentWillMount() {
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

    ajaxCategoryLoaded(content){
        this.setState({categories: content});
    }

    render() {
        return (
            <div class="main">
                <CategoryForm
                    categories={this.state.categories}
                    ajaxCategoryLoaded={this.ajaxCategoryLoaded}
                />

                <NoteeTable
                    modelName="Category"
                    columns={['id', 'name', 'slug', 'parent_id', 'is_private']}
                    contents={this.state.categories}
                    store={CategoryStore}
                    actions={CategoryActions}
                    ajaxLoad={this.ajaxCategoryLoaded}
                />
            </div>
        );
    }

    changeSuccessed(){
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
    }
    
};
