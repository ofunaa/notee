import React, {Component, PropTypes} from "react";

// notee
import ImageActions from '../../actions/ImageActions';
import ImageConstants from '../../constants/ImageConstants';
import ImageStore from '../../stores/ImageStore';

// material-ui
import Snackbar from 'material-ui/Snackbar';
import { Link } from "react-router";

export default class ImageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            upload_file: null,
            tap_image: "",
            snackbar_open: false,
            snackbar_txt: ""
        };

        // imageSection
        this.clickImage = this.clickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        // eventemit
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.saveFailed = this.saveFailed.bind(this);
        this.deleteSuccessed = this.deleteSuccessed.bind(this);
        this.deleteFailed = this.deleteFailed.bind(this);

        // ajax
        this.setImages = this.setImages.bind(this);
        this.ajaxLoaded = this.ajaxLoaded.bind(this);

        // handles
        this.handleChangeImage = this.handleChangeImage.bind(this);

        // snackbar
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    componentWillMount() {
        this.setImages();
        ImageStore.addChangeListener(ImageConstants.IMAGE_CREATE, this.saveSuccessed);
        ImageStore.addChangeListener(ImageConstants.IMAGE_CREATE_FAILED, this.saveFailed);
        ImageStore.addChangeListener(ImageConstants.IMAGE_DELETE, this.deleteSuccessed);
        ImageStore.addChangeListener(ImageConstants.IMAGE_DELETE_FAILED, this.deleteFailed);
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

    clickImage(e) {
        this.setState({tap_image: e.target.src});
    }

    uploadImage() {
        ImageActions.image_create(this.state.upload_file);
    }

    deleteImage() {
        ImageActions.image_delete(this.state.tap_image);
    }

    saveSuccessed(){
        this.displaySnackBar("Upload New IMAGE!");
        this.setImages();
        this.setState({upload_file: null});
    }

    saveFailed(){
        this.displaySnackBar("Sorry..! Upload Failed..!");
    }

    deleteSuccessed(){
        this.displaySnackBar("Delete IMAGE!");
        this.setImages();
        this.setState({tap_image: null});
    }

    deleteFailed(){
        this.displaySnackBar("Sorry..! Delete Failed..!");
    }

    handleChangeImage(e) {
        var files = e.target.files;
        this.setState({upload_file: files[0]});
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
