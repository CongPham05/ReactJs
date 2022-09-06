import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

class Medicalfacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Co So Y Te Noi Bat</span>
                        <button className='btn-section'>Xem Them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Co Xuong Khop 1</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Medicalfacility);
