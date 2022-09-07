import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'> Bac Si Noi Bat Tuan Qua</span>
                        <button className='btn-section'>Xem Them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                        <div className='position text-center'>
                                            <div>Giao Su Tien Si Hoi DAn IT</div>
                                            <div>Co Xuong Khop</div>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
