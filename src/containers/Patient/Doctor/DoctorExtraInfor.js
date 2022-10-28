import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from '../../../utils';



class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isShowDetailInfor: false
        })
    }
    async componentDidMount() {

    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.language !== prevProps.language) {

        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {

        let { isShowDetailInfor } = this.state;

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'> Địa chỉ phòng khám</div>
                    <div className='name-clinic'> Phòng khám chuyên khoa</div>
                    <div className='detail-address'> 445 Nguyễn Khang, Cầu giấy, Hà nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            Giá Khám: 250.000đ.
                            <span onClick={() => this.showHideDetailInfor(true)}>Xem Chi Tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM: . </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'> Giá Khám</span>
                                    <span className='right'> 250.000đ</span>

                                </div>

                                <div className='note'>
                                    Được ưu tiên khám trước khi đặt khám qua BookingCare.com

                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
