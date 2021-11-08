import React from 'react';
import './styles.scss'
// import './main.js'
import { Validator, ValidatorConfirmed, ValidatorIsEmail, ValidatorMinLength, ValidatorRequired } from './main';
import finalProductList from '../../constants/finalProductList';

ValidationForm.propTypes = {
    
};

function ValidationForm(props) {

    

    document.addEventListener('DOMContentLoaded', function () {
        // Mong muốn của chúng ta
        Validator({
            formSelector: '#form-1',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    ValidatorRequired('#fullname'),
                    ValidatorRequired('#email'),
                    ValidatorIsEmail('#email'),
                    ValidatorRequired('#password'),
                    ValidatorMinLength('#password', 6),
                    ValidatorRequired('#password_confirmation'),
                    ValidatorConfirmed('#password_confirmation', function() {
                        return document.querySelector("#form-1 #password").value
                    }, 'Mật khẩu nhập lại không chính xác'),
                ],
                onSubmit: function(data) {
                    console.log(data)
                }
        })   
    });
    console.log(finalProductList)
    return (
        <>
        <div>
            <div className="main">
                <form action="" id="form-1">
                    <h3 class="heading">Thành viên đăng ký</h3>
                    <p class="desc">Cùng nhau học lập trình miễn phí tại F8 ❤️</p>

                    <div class="spacer"></div>

                    <div className="form-group">
                        <label for="fullname" class="form-label">Tên đầy đủ</label>
                        <input id="fullname" name="fullname" type="text" placeholder="VD: Sơn Đặng" className="form-control" />
                        <span class="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input id="email" name="email" type="text" placeholder="VD: email@domain.com" className="form-control" />
                        <span class="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label for="password" class="form-label">Mật khẩu</label>
                        <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" className="form-control" />
                        <span class="form-message"></span>
                    </div>
      
                    <div className="form-group">
                        <label for="password_confirmation" class="form-label">Nhập lại Mật khẩu</label>
                        <input id="password_confirmation" name="password_confirmation" placeholder="Nhập lại mật khẩu" type="password" className="form-control" />
                        <span class="form-message"></span>
                    </div>

                    <button className="form-submit">Đăng ký</button>
                </form>
            </div>
        </div>

        </>
    );
}

export default ValidationForm;