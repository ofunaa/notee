import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import TrashStore from '../../stores/TrashStore';
import TrashActions from '../../actions/TrashActions';
import TrashTableRow from './TrashTableRow.react';
import Constants from '../../constants/NoteeConstants';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

export default class TrashSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trash_contents: [],
            columns: [],
            model_name: null
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);
        this.setModelName = this.setModelName.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.returnTableRow = this.returnTableRow.bind(this);
    }
    
    componentDidMount() {
        var now_model = "posts";
        if(this.props.params.model){now_model = this.props.params.model;}

        this.setState({model_name: now_model});
        this.setColumns(now_model);
        TrashStore.loadTrashes(now_model, this.ajaxLoaded);
        TrashStore.addChangeListener(Constants.TRASH_UPDATE, this.changeSuccessed);
    }

    componentWillUnmount(){
        TrashStore.removeChangeListener(Constants.TRASH_UPDATE, this.changeSuccessed);
    }

    render() {
        var models = ["posts", "categories", "users", "images", "comments"];
        var click = this.setModelName;
        return (
            <div class="main">
                <h2>Trashbox: {this.state.model_name}</h2>
                {models.map((content, index)=>{
                    return (
                        <Link to={`/notee/trashes/${content}`} activeClassName="active" class="mr_20" key={index}>
                            <RaisedButton onClick={function(){click(content)}} label={content} primary={true} />
                        </Link>
                    );
                })}
                <NoteeTable
                    modelName="Trash"
                    columns={this.state.columns}
                    contents={this.state.trash_contents}
                    store={TrashStore}
                    actions={TrashActions}
                    returnTableRow={this.returnTableRow}
                    buttonNum={1}
                />
            </div>
        );
    }

    ajaxLoaded(contents){
        this.setState({trash_contents: contents});
    }

    changeSuccessed(){
        TrashStore.loadTrashes(this.state.model_name, this.ajaxLoaded);
    }

    setModelName(name) {
        this.setColumns(name);
        this.setState({model_name: name});
        TrashStore.loadTrashes(name, this.ajaxLoaded);
    }

    setColumns(name){

        switch (name){
            case "categories":
                this.setState({columns: ['id', 'name', 'slug', 'parent_id', 'is_private', 'time_limit']});
                break;
            case "posts":
                this.setState({columns: ['title', 'category', 'status', 'published_at', 'time_limit']});
                break;
            case "users":
                this.setState({columns: ['name', 'email', 'role', 'time_limit']});
                break;
            case "images":
                this.setState({columns: ['id', 'content', 'time_limit']});
                break;
            case "comments":
                this.setState({columns: ['post_title', 'name', 'email', 'content', 'is_hidden', 'time_limit']});
                break;
        }
    }

    returnTableRow(content){
        return (
            <TrashTableRow
                content={content}
                columns={this.state.columns}
                model_name={this.state.model_name}
                actions={TrashActions}
                key={content.id} />
        );
    }
};
