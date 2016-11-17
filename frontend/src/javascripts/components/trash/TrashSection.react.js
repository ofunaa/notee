import React, {Component, PropTypes} from 'react';

// notee

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';


export default class TrashSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trash_contents: []
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);
        this.loadTrashes = this.loadTrashes.bind(this);

    }

    componentDidMount() {
        // CategoryStore.addChangeListener(Constants.CATEGORY_UPDATE, this.changeSuccessed);
    }

    componentWillMount() {
        // CategoryStore.loadAllCategories(this.ajaxCategoryLoaded);
        this.loadTrashes();
    }

    ajaxLoaded(contents){
        this.setState({trash_contents: contents});
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

    loadTrashes(){

    }

};
