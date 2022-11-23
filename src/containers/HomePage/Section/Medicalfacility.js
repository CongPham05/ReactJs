import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import './Medicalfacility.scss';
import { withRouter } from "react-router";

class Medicalfacility extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataClinic: [],
        })
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        console.log("check information Doctor : ", clinic)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)

        }
    }
    render() {
        let { dataClinic } = this.state;
        console.log(dataClinic)
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem Thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div
                                                className='bg-image section-clinic'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className='clinic-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Medicalfacility));
