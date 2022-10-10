import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            detailDotor: {}
        })
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let doctorId = this.props.match.params.id;
            let res = await getDetailInforDoctor(doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDotor: res.data
                })
            }
            console.log('check', res)
        }
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {

    }
    render() {

        let { detailDotor } = this.state;
        let { language } = this.props
        let nameVi = "", nameEn = "";
        if (detailDotor && detailDotor.positionData) {

            nameVi = `${detailDotor.positionData.valueVi},${detailDotor.firstName} ${detailDotor.lastName}`;
            nameEn = `${detailDotor.positionData.valueEn},${detailDotor.firstName} ${detailDotor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${detailDotor.image ? detailDotor.image : ""})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDotor.Markdown
                                    && detailDotor.Markdown.description
                                    && <span>
                                        {detailDotor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-container'>
                        {detailDotor && detailDotor.Markdown
                            && detailDotor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailDotor.Markdown.contentHTML }}>
                            </div>

                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
