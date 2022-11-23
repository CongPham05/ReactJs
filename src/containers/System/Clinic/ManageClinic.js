import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            address: "",
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        })
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnchangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewClinic = async () => {

        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new clinic success !')
            this.setState({
                name: '',
                address: '',
                imageBase64: 'cong',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }
        else {
            toast.error('Add new clinic faild !')

        }
    }
    render() {
        console.log("check", this.state)
        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'> Quản lý tất cả các Phòng khám</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(e) => this.handleOnchangeInput(e, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label > Ảnh phòng khám </label><br></br>
                        <input
                            type='file'
                            onChange={(e) => this.handleOnchangeImage(e)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control'
                            type='text'
                            value={this.state.address}
                            onChange={(e) => this.handleOnchangeInput(e, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button
                            className='btn-save-clinic'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
