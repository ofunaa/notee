import React, {Component, PropTypes} from 'react';
import { Link } from "react-router";

// notee
import TrashMain from './TrashMain.react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

export default class TrashSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            model_name: null
        };

        this.setModelName = this.setModelName.bind(this);
    }
    
    componentDidMount() {
        if(this.props.params.model != this.state.model_name){
            this.setState({model_name: this.props.params.model});
        }else{
            this.setState({model_name: "posts"});
        }
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
                <TrashMain model_name={this.state.model_name} />
            </div>
        );
    }

    setModelName(name) {
        this.setState({model_name: name});
    }
};
