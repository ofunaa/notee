import React from 'react';
import BlogActions from '../../actions/BlogActions';

var MainSection = React.createClass({

    getInitialState: function() {
        return {
            title: "false",
            content: "main Content",
            slug: "slug",
            status: this.props.statuses[0],
            category_id: "",
            thumbnail_id: "",
            seo_keyword: "",
            seo_description: ""
        };
    },

    getDefaultProps() {
        return {
            statuses: ["draft", "published", "secret_published", "privated", "deleted"]
        }
    },

    render() {

        var statues = this.props.statuses.map(function(status) {
            return <option key={status} value={status}>{status}</option>;
        });

        return (
            <div class="main">
                <div class="title">
                    <input
                        class="form_text"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChangeTitle}
                    />
                    <textarea
                        class="form_textarea"
                        type="textarea"
                        value={this.state.content}
                        onChange={this.handleChangeContent}
                    />
                    <input
                        class="form_text"
                        type="text"
                        value={this.state.slug}
                        onChange={this.handleChangeSlug}
                    />
                    <select
                        class="form_select"
                        type="select"
                        value={this.state.status}
                        onChange={this.handleChangeStatus}>
                        {statues}
                    </select>
                    <input
                        class="form_text"
                        type="text"
                        value={this.state.seo_keyword}
                        onChange={this.handleChangeSeoKeyword}
                    />
                    <textarea
                        class="form_textarea"
                        type="textarea"
                        value={this.state.seo_description}
                        onChange={this.handleChangeSeoDescription}
                    />
                    <button onClick={this.aaaclick}>go title</button>
                </div>
            </div>
        );
    },

    handleChangeTitle: function(e) {
        this.setState({ title: e.target.value });
    },

    handleChangeContent: function(e) {
        this.setState({ content: e.target.value });
    },

    handleChangeSlug: function(e) {
        this.setState({ slug: e.target.value });
    },

    handleChangeStatus: function(e) {
        this.setState({ status: e.target.value });
    },

    handleChangeSeoKeyword: function(e) {
        this.setState({ seo_keyword: e.target.value });
    },

    handleChangeSeoDescription: function(e) {
        this.setState({ seo_description: e.target.value });
    },

    aaaclick: function(e){

        BlogActions.submit(this.state);
        this.setState({
            title: '',
            content: '',
            slug: '',
            status: this.props.statuses[0],
            seo_keyword: '',
            seo_description: ''
        });
    }
});

module.exports = MainSection;
