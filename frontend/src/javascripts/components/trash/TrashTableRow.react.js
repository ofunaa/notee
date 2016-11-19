import React, {Component, PropTypes} from 'react'

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export default class TrashTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {contents: []};

        this.setContent = this.setContent.bind(this);
        this.updateTrash = this.updateTrash.bind(this);
    }

    componentDidMount() {
        this.setContent();
    }

    render() {

        var style = {
            image: {
                width: "auto",
                height: "100px",
                float: "left",
                backgroundColor: "rgba(255, 255, 255, 0.9)"
            }
        }

        return(
            <TableRow>
                {
                    this.state.contents.map((content, index)=>{
                        if(String(content).match("jpg")){
                            return (
                                <TableRowColumn key={index}>
                                    <img
                                        style={style.image}
                                        src={window.location.origin + "/notee/" + content}
                                    />
                                </TableRowColumn>
                            );
                        }else{
                            return (
                                <TableRowColumn key={index}>{content}</TableRowColumn>
                            );
                        }
                    })
                }
                <TableRowColumn>
                    <RaisedButton
                        onClick={this.updateTrash}
                        label="Restore"
                        secondary={true}
                        disabled={false}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    setContent(){
        var arr = [];
        var tmp_contents = this.props.content;
        this.props.columns.map((column)=>{
            if(column == "time_limit"){
                var js_updated_at =  Date.parse(tmp_contents.updated_at);
                var now = new Date().getTime();
                var tmp_mili = 86400000 * 30 - (now - js_updated_at);
                var time_limit = String(Math.ceil(tmp_mili / 1000 / 60 / 60 / 24)) + " days";
                arr.push(time_limit);
            }else{
                var content = "tmp_contents." + column;
                arr.push(eval(content));
            }
        })

        this.setState({contents: arr});
    }

    updateTrash(e){
        this.props.actions.update(this.props.content.id, this.props.model_name);
    }


}
