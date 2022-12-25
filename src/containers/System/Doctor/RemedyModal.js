import React, { Component } from 'react';
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';



class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: ''
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({

                email: this.props.dataModal.email

            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnchangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='md'
                centered
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email Benh nhan</label>
                            <input
                                className='form-control'
                                type='email'
                                value={this.state.email}
                                onClick={(e) => this.handleOnchangeEmail(e)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chon file don thuoc</label>
                            <input
                                className='form-control-file'
                                type='file'
                                onChange={(e) => this.handleOnchangeImage(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary'
                        onClick={() => this.handleSendRemedy()}
                    >Send
                    </Button>
                    {' '}
                    <Button color='secondary' onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
