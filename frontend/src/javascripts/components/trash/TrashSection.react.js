import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import TrashStore from '../../stores/TrashStore';
import TrashActions from '../../actions/TrashActions';
import Constants from '../../constants/NoteeConstants';

// common-parts
import NoteeTable from '../common/table/NoteeTable.react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';


export default class TrashSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trash_contents: [],
            columns: [],
            model_name: "posts"
        };

        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.changeSuccessed = this.changeSuccessed.bind(this);
        this.setColumns = this.setColumns.bind(this);
    }

    componentDidMount() {
    }

    componentWillMount() {
        if(this.props.params.model){
            this.setState({model_name: this.props.params.model});
        }
        TrashStore.addChangeListener(Constants.TRASH_UPDATE, this.changeSuccessed);
        this.setColumns();
        TrashStore.loadTrashes(this.state.model_name, this.ajaxLoaded);
    }


    ajaxLoaded(contents){
        this.setState({trash_contents: contents});
    }

    render() {
        var models = ["posts", "categories", "users", "images", "comments"];

        return (
            <div class="main">
                <h2>Trashbox: {this.state.model_name}</h2>
                {models.map((content, index)=>{
                    return (
                        <Link to={`/notee/trashes/${content}`} activeClassName="active" class="mr_20" key={index}>
                            <RaisedButton label={content} primary={true} />
                        </Link>
                    );
                })}
                <NoteeTable
                    modelName="Trash"
                    columns={this.state.columns}
                    contents={this.state.trash_contents}
                    store={TrashStore}
                    actions={TrashActions}
                    ajaxLoad={this.ajaxLoaded}
                />
            </div>
        );
    }

    changeSuccessed(){
        TrashStore.loadTrashes(this.state.model_name, this.ajaxLoaded);
    }

    setColumns(){

        switch (this.state.model_name){
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
