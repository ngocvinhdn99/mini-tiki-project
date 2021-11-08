import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

LoginForm.propTypes = {
    
};

function LoginForm(props) {
    return (
        <div>
            <div>
                <form action method="post" className="form" id="form-1">
                    <h3 class="heading">Thành viên đăng nhập</h3>
                    <p class="desc">Chào mừng bạn đã quay trở lại kênh ❤️</p>

                    <div class="spacer"></div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Tên đầy đủ</label>
                        <input id="email" name="email" type="text" rules="required|isEmail" placeholder="VD: vinh@gmail.com" className="form-control"  />
                        <span className="form-message"></span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Tên đầy đủ</label>
                        <input id="password" name="password" type="password" rules="required|min:6" placeholder="Nhập mật khẩu" className="form-control"  />
                        <span className="form-message"></span>
                    </div>

                    <button class="form-submit">Đăng nhập</button>
                </form>     
            </div>
        </div>
    );
}

export default LoginForm;