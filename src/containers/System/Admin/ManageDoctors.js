import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctors.scss';
import * as actions from '../../../store/actions';
import { Alert } from 'reactstrap';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';


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
            //save to markdown table
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedPayment: "",
            sessionProvince: "",
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }
    buildDataInputSelect = (inputdata, type) => {
        let result = [];
        let { language } = this.props;

        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })

        }
        return result;
    }
    componentDidMount = () => {
        this.props.getAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
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
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            console.log('hoi dan it:', dataSelectPrice, dataSelectPayment, dataSelectProvince);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
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
        let { hasOldData } = this.state;

        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        this.setState({
            contentMarkdown: "",
            contentHTML: "",
            selectedOption: "",
            description: "",
        })

    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentMarkdown: "",
                contentHTML: "",
                description: "",
                hasOldData: false
            })
        }
        console.log(`check : `, res)
    }
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        < Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                            className='form-control'
                            rows='4'>
                        </textarea>
                    </div>

                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>
                            Chọn giá
                        </label>
                        <Select
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />


                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            Chọn phương thức thanh toán
                        </label>
                        <Select
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />


                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            Chọn tỉnh thành
                        </label>
                        <Select
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'} />


                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'btn-save-doctor' : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span><FormattedMessage id='admin.manage-doctor.save' /></span>
                        :
                        <span><FormattedMessage id='admin.manage-doctor.add' /></span>}
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
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.fecthAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
        getAllDoctors: () => dispatch(actions.fecthAllDoctor()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
