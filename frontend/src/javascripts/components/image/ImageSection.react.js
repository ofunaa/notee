import React, {Component, PropTypes} from "react";

// actions
import ImageActions from '../../actions/ImageActions';

// stores
import ImageStore from '../../stores/ImageStore';
import UserStore from '../../stores/UserStore';

// components
import AuthorityButtonCreate from '../common/authority/AuthorityButtonCreate.react.js';
import AuthorityButtonDelete from '../common/authority/AuthorityButtonDelete.react.js';

// constatns
import Constants from '../../constants/NoteeConstants';

// utils
import AuthorityUtil from '../../utils/AuthorityUtil';

export default class ImageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            upload_file: null,
            tap_image: "",
            now_user: ""
        };

        // imageSection
        this.setImages = this.setImages.bind(this);
        this.clickImage = this.clickImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        // eventemit
        this.deleteSuccessed = this.deleteSuccessed.bind(this);

        // ajax
        this.ajaxLoaded = this.ajaxLoaded.bind(this);
        this.ajaxNowUserLoaded = this.ajaxNowUserLoaded.bind(this);

        // handles
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    componentDidMount() {
        ImageStore.addChangeListener(Constants.IMAGE_CREATE, this.setImages);
        ImageStore.addChangeListener(Constants.IMAGE_DELETE, this.setImages);
    }

    componentWillMount() {
        ImageStore.loadImages(this.ajaxLoaded);
        UserStore.loadUserByToken(this.ajaxNowUserLoaded);
    }

    ajaxLoaded(content){
        if(!content){return;}
        this.setState({images: content});
    }

    ajaxNowUserLoaded(content) {
        this.setState({now_user: content});
    }

    render() {
        AuthorityUtil.checkAuthority("ImageSection", this.state.now_user);

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
                    <div className="mt_15">
                        <AuthorityButtonCreate
                            className="mt_15"
                            modelName="Image"
                            now_user={this.state.now_user}
                            createMethod={this.uploadImage}
                        />
                    </div>
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
                    <div className="mt_15">
                        <AuthorityButtonDelete
                            modelName="Image"
                            now_user={this.state.now_user}
                            deleteMethod={this.deleteImage}
                        />
                    </div>
                </div>
            </div>
        );
    }

    setImages() {
        ImageStore.loadImages(this.ajaxLoaded);
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
        ImageStore.loadImages(this.ajaxLoaded);
        this.setState({tap_image: null});
    }

    handleChangeImage(e) {
        var files = e.target.files;
        this.setState({upload_file: files[0]});
    }


};
