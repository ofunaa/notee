import React, {Component, PropTypes} from 'react';

// notee

// material-ui
import { Link } from "react-router";

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';


export default class TrashSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };

        this.ajaxCategoryLoaded = this.ajaxCategoryLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);

    }

    componentDidMount() {
        // CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE, this.changeSuccessed);
    }

    componentWillMount() {
        // CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

    ajaxCategoryLoaded(content){
        this.setState({categories: content});
    }

    render() {
        return (
            <div class="main">

            </div>
        );
    }

    changeSuccessed(){
        // CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
    }

};
