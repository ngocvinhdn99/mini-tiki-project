import PropTypes from 'prop-types';
import React from 'react';
import Validator from '../Validator/main';
import './styles.scss';
import CloseIcon from '@material-ui/icons/Close';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
    onClickClose: PropTypes.func,
};

function RegisterForm({onSubmit = null, onClickClose = null}) {

    document.addEventListener('DOMContentLoaded', function () {
        // Mong muốn của chúng ta
        var form1 = new Validator('#form-1')

        form1.onSubmit = function(data) {
            console.log(data)
        } 
    });

    const handleClose = () => {
        if (onClickClose) {
            onClickClose()
        }
    }

    // const handlePreventDefault = (e) => {
    //     e.preventDefault()
    // }

    return (
        <div>
            <form action method="post" className="form" id="form-1">
                <CloseIcon onClick={handleClose} className="close-icon" />
                <h3 className="heading">Thành viên đăng ký</h3>
                <p className="desc">Hãy trở thành thành viên của kênh ❤️</p>

                <div className="spacer"></div>

                <div className="form-group">
                    <label htmlFor="fullname" className="form-label">Tên đầy đủ</label>
                    <input id="fullname" name="fullname" type="text" rules="required" placeholder="VD: Vinh Huynh" className="form-control"  />
                    <span className="form-message"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" name="email" type="text" rules="required|isEmail" placeholder="VD: vinh@gmail.com" className="form-control"  />
                    <span className="form-message"></span>
                </div>
                
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input id="password" name="password" type="password" rules="required|min:6" placeholder="Nhập mật khẩu" className="form-control"  />
                    <span className="form-message"></span>
                </div>

                <div className="form-group">
                    <label htmlFor="password-confirmation" className="form-label">Nhập lại mật khẩu</label>
                    <input id="password-confirmation" name="password-confirmation" type="password" rules="required|getConfirmed" placeholder="Nhập lại mật khẩu" className="form-control"  />
                    <span className="form-message"></span>
                </div>

                <button className="form-submit">Đăng ký</button>

                <div className="had-account">
                    Đã có tài khoản? Đăng nhập ở đây
                </div>
            </form>     
        </div>
    );
}

export default RegisterForm;