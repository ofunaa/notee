import React, {Component, PropTypes} from 'react';

// notee
import CategoryStore from '../../stores/CategoryStore';
import CategoryConstants from '../../constants/CategoryConstants';

// material-ui
import { Link } from "react-router";
import CategoryTable from './CategoryTable.react';
import CategoryForm from './CategoryForm.react';
import Snackbar from 'material-ui/Snackbar';


export default class CategorySection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            snackbar_open: false,
            snackbar_txt: ""
        };

        // ajax
        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);

        // eventemit
        this.changeSuccessed = this.changeSuccessed.bind(this);

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount() {
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
        CategoryStore.addChangeListener(CategoryConstants.CATEGORY_CREATE, this.changeSuccessed);
        CategoryStore.addChangeListener(CategoryConstants.CATEGORY_UPDATE, this.changeSuccessed);
        CategoryStore.addChangeListener(CategoryConstants.CATEGORY_DELETE, this.changeSuccessed);
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
                    displaySnackBar={this.displaySnackBar}
                />
                <CategoryTable 
                    categories={this.state.categories} 
                    ajaxLoad={this.ajaxCategoryLoaded}
                    displaySnackBar={this.displaySnackBar}
                />
                <Snackbar
                    open={this.state.snackbar_open}
                    message={this.state.snackbar_txt}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    bodyStyle={{backgroundColor: "rgba(0,0,0,0.8)"}}
                />
            </div>
        );
    }

    changeSuccessed(){
        CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

    displaySnackBar(txt){
        this.setState({
            snackbar_open: true,
            snackbar_txt: txt
        });
    }

    handleRequestClose(){
        this.setState({
            snackbar_open: false
        });
    }
    
};
