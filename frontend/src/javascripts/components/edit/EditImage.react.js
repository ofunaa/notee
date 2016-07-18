import React, {Component, PropTypes} from "react";

// notee
import NoteeActions from '../../actions/NoteeActions';
import NoteeStore from '../../stores/NoteeStore';
import NoteeConstants from '../../constants/NoteeConstants';

// material-ui
import Snackbar from 'material-ui/Snackbar';
import { Link } from "react-router";

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            upload_file: null,
            tap_image: "",
            snackbar_open: false,
            snackbar_txt: ""
        };


        // editImage
        this.clickImage = this.clickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.addImage = this.addImage.bind(this);

        // eventemit
        this.saveSuccessed = this.saveSuccessed.bind(this);
        this.saveFailed = this.saveFailed.bind(this);

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
        NoteeStore.addChangeListener(NoteeConstants.IMAGE_CREATE, this.saveSuccessed);
        NoteeStore.addChangeListener(NoteeConstants.IMAGE_CREATE_FAILED, this.saveFailed);
    }

    setImages() {
        NoteeStore.loadAllImages(this.ajaxLoaded);
    }

    ajaxLoaded(content){
        this.setState({images: content});
    }

    render() {

        var style = {
            image: {
                main: {
                    width: "90%",
                    height: "90%",
                    float: "left",
                    position: "fixed",
                    zIndex: "100000",
                    backgroundColor: "rgba(30, 30, 30, 0.9)",
                    marginTop: "-80px",
                    overflowY: "scroll",
                    color: "white"
                },
                header: {
                    width: "100%",
                    height: "4%",
                    float: "left",
                    padding: "3%",
                    borderBottom: "1px solid #fff"
                },
                left: {
                    width: "55%",
                    height: "75%",
                    padding: "5%",
                    float: "left",
                    overflowY: "scroll"
                },
                right: {
                    width: "20%",
                    height: "80%",
                    padding: "5%",
                    float: "left",
                    borderLeft: "1px solid #fff"
                },
                image: {
                    width: "200px",
                    height: "auto",
                    float: "left",
                    marginRight: "10px",
                    marginBottom: "10px"
                },
                preview: {
                    width: "100%",
                    height: "auto"
                },
                close: {
                    float: "right",
                    marginRight: "10%"
                }
            }
        }

        return (
            <div style={style.image.main}>
                <div style={style.image.header}>
                    <input
                        type="file"
                        ref="image"
                        onChange={this.handleChangeImage}
                    />
                    <button onClick={this.uploadImage}>Upload</button>
                    <button onClick={this.props.pushImage} style={style.image.close}>閉じる</button>
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
                        <button onClick={this.addImage}>Add</button>
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

    addImage() {
        this.props.imageInsert(this.state.tap_image);
    }

    clickImage(e) {
        this.setState({tap_image: e.target.src});
    }

    uploadImage() {
        NoteeActions.image_create(this.state.upload_file);
    }

    saveSuccessed(){
        this.displaySnackBar("Upload New IMAGE!");
        this.setState({upload_file: null});
        this.setImages();
    }

    saveFailed(){
        this.displaySnackBar("Sorry..! Upload Failed..!");
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
