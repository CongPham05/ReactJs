import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctors.scss';
import * as actions from '../../../store/actions';
import { Alert } from 'reactstrap';
import { LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LanguageServiceMode } from 'typescript';


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
            listDoctors: [],
        }
    }
    buildDataInputSelect = (inputdata) => {
        let result = [];
        let { language } = this.props;

        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })

        }
        return result;
    }
    componentDidMount = () => {
        this.props.getAllDoctors();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            }
            )
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })

    }
    handleSaveContentMarkdown = () => {
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
        })

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
        console.log(this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'> Tao them thong tin doctor</div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label> Chon bac si</label>
                        < Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
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
        language: state.app.language,
        allUsersRedux: state.admin.allUsers,
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.fecthAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
        getAllDoctors: () => dispatch(actions.fecthAllDoctor()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
