import React, {Component, PropTypes} from "react"
import NoteeActions from '../../actions/NoteeActions'
import NoteeStore from '../../stores/NoteeStore';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            image: "",
            tap_image: ""
        };
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.addImage = this.addImage.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
    }

    componentDidMount() {
        NoteeStore.loadAllImages(this.ajaxLoaded);
    }

    ajaxLoaded(content){
        console.log(content);
        this.setState({images: content});
    }

    render() {

        var style = {
            image: {
                main: {
                    width: "100%",
                    height: "100%",
                    float: "left",
                    position: "fixed",
                    zIndex: "100",
                    backgroundColor: "rgba(30, 30, 30, 0.9)"
                }
            },

            form: {
                input_file: {

                },
                button: {

                }
            }
        }

        return (
            <div style={style.image.main}>
                <div>
                    <input
                        style={style.form.input_file}
                        type="file"
                        value={this.state.image}
                        onChange={this.handleChangeImage}
                    />
                </div>
                <div>
                    {this.state.images.map((image, index)=>{
                        return(
                            <img key={index} src={image} />
                        );
                    })}
                </div>
                <div>
                    <div>
                        <img src={this.state.tap_image} />
                    </div>
                    <div>
                        <button
                            style={style.form.button}
                            onClick={this.addImage}>Add</button>
                    </div>
                </div>
            </div>
        );
    }

    handleChangeImage(e) {
        console.log("きてる？");
        this.setState({ image: e.target.value });
    }

    addImage() {
        console.log("pushpush");
        NoteeActions.image_create(this.state.image);
    }

};
