import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctors.scss';
import * as actions from '../../../store/actions';
import { Alert } from 'reactstrap';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
        }
    }
    componentDidMount = () => {

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }
    handleSaveContentMarkdown = () => {
        console.log("check:", this.state)
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
        // console.log(`Option selected:`, selectedOption)
    }
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'> Tao them thong tin doctor</div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label> Chon bac si</label>
                        < Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className='content-right'>
                        <label> Thông tin giới thiệu</label>
                        <textarea
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                            className='form-control'
                            rows='4'>
                        </textarea>
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='btn-save-doctor'>
                    Lưu thông tin
                </button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allUsersRedux: state.admin.allUsers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.fecthAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
