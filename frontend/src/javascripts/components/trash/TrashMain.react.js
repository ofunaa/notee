import React, {Component, PropTypes} from 'react';

// notee
import TrashStore from '../../stores/TrashStore';
import TrashActions from '../../actions/TrashActions';
import Constants from '../../constants/NoteeConstants';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';


export default class TrashMain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trash_contents: [],
            columns: []
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);
        this.setColumns = this.setColumns.bind(this);
    }

    componentWillReceiveProps(props) {
        TrashStore.loadTrashes(props.model_name, this.ajaxLoaded);
        this.setColumns(props.model_name);
    }

    componentDidMount() {
        TrashStore.addChangeListener(Constants.TRASH_UPDATE, this.changeSuccessed);
    }

    ajaxLoaded(contents){
        this.setState({trash_contents: contents});
    }

    render() {
        return (
            <NoteeTable
                modelName="Trash"
                columns={this.state.columns}
                contents={this.state.trash_contents}
                store={TrashStore}
                actions={TrashActions}
                ajaxLoad={this.ajaxLoaded}
                buttonNum={1}
            />
        );
    }

    changeSuccessed(){
        TrashStore.loadTrashes(this.props.model_name, this.ajaxLoaded);
    }

    setColumns(name){

        switch (name){
            case "categories":
                this.setState({columns: ['id', 'name', 'slug', 'parent_id', 'is_private']});
                break;
            case "posts":
                this.setState({columns: ['title', 'category', 'status', 'published_at']});
                break;
            case "users":
                this.setState({columns: ['name', 'email', 'role']});
                break;
            case "images":
                this.setState({columns: ['id']});
                break;
            case "comments":
                this.setState({columns: ['post_title', 'name', 'email', 'content', 'is_hidden']});
                break;
        }
    }


};
