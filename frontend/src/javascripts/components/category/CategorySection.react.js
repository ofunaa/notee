import React, {Component, PropTypes} from 'react'
import NoteeStore from '../../stores/NoteeStore';
import { Link } from "react-router"
import CategoryTable from './CategoryTable.react'
import CategoryForm from './CategoryForm.react'


export default class CategorySection extends Component {

    constructor(props) {
        super(props);
        this.state = { categories: [] };
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
    }

    componentDidMount() {
        NoteeStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

    ajaxCategoryLoaded(content){
        this.setState({categories: content});
    }

    render() {
        return (
            <div class="main">
                <CategoryForm
                    categories={this.state.categories}
                    ajaxLoad={this.ajaxCategoryLoaded}
                />
                <CategoryTable 
                    categories={this.state.categories} 
                    ajaxLoad={this.ajaxCategoryLoaded}
                />
            </div>
        );
    }
};
