import React, {Component, PropTypes} from "react";

// notee
import ImageActions from '../../actions/ImageActions';
import ImageStore from '../../stores/ImageStore';

export default class ImageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            upload_file: null,
            tap_image: ""
        };

        // imageSection
        this.clickImage = this.clickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        // eventemit
        this.deleteSuccessed = this.deleteSuccessed.bind(this);

        // ajax
        this.setImages = this.setImages.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);

        // handles
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    componentWillMount() {
        this.setImages();
    }

    setImages() {
        ImageStore.loadAllImages(this.ajaxLoaded);
    }

    ajaxLoaded(content){
        if(!content){return;}
        this.setState({images: content});
    }

    render() {

        var style = {
            image: {
                header: {
                    width: "100%",
                    height: "10%",
                    float: "left",
                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                },
                left: {
                    width: "70%",
                    height: "80%",
                    paddingTop: "30px",
                    float: "left",
                    overflowY: "scroll"
                },
                right: {
                    width: "30%",
                    height: "90%",
                    float: "left"
                },
                image: {
                    width: "200px",
                    height: "auto",
                    float: "left",
                    marginRight: "10px",
                    marginBottom: "10px"
                },
                preview: {
                    width: "90%",
                    height: "auto",
                    marginLeft: "5%",
                    paddingTop: "30px",
                    float: "left"
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
                <div style={style.image.header}>
                    <input
                        style={style.form.input_file}
                        type="file"
                        ref="image"
                        onChange={this.handleChangeImage}
                    />
                    <button
                        style={style.form.button}
                        onClick={this.uploadImage}>Upload</button>
                </div>
                <div style={style.image.left}>
                    {this.state.images.map((image)=>{
                        return(
                            <img
                                key={image.id}
                                class={image.id}
                                src={window.location.origin + "/notee/" + image.content}
                                style={style.image.image}
                                onClick={this.clickImage}
                            />
                        );
                    })}
                </div>
                <div style={style.image.right}>
                    <div>
                        <img style={style.image.preview} src={this.state.tap_image} />
                    </div>
                    <div>
                        <button
                            style={style.form.button}
                            onClick={this.deleteImage}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }

    clickImage(e) {
        this.setState({tap_image: e.target.src});
    }

    uploadImage() {
        ImageActions.create(this.state.upload_file);
    }

    deleteImage() {
        ImageActions.delete(this.state.tap_image);
    }

    deleteSuccessed(){
        this.setImages();
        this.setState({tap_image: null});
    }

    handleChangeImage(e) {
        var files = e.target.files;
        this.setState({upload_file: files[0]});
    }


};
