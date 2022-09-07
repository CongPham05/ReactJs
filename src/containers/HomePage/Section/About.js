import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyen Thong Noi gi ve Chung Toi
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/yvyKm94XOyY"
                            title="Nhạc Lofi chill || Nhạc Chill Nghe Hết Buồn Phiền"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Tại sao chúng ta lại rất dễ dàng quên đi những mục tiêu cao cả của mình: rèn luyện sức khỏe, ăn uống lành mạnh hơn, không sân si, thiền để tịnh tâm hoặc theo đuổi những ước mơ, sở thích của mình? Sự phân tâm, cám dỗ của những thứ mới mẻ, hấp dẫn hay áp lực việc phải chạy deadline, nghe sếp mắng, khách cằn nhằn, đương đầu với những khó khăn hàng ngày mở cửa ra đã thấy…chính là thứ luôn sẵn sàng đánh bại những ý muốn tốt đẹp, những dự định, hoài bão và thậm chí là cả bản tính lương thiện của chúng ta.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
