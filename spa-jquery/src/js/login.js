// import 'bootstrap/dist/js/bootstrap.min.js'

import {getCookie, setCookie} from './libs/cookie.js'
import './libs/loading.js'
import './libs/loadProgress.js'
import './libs/api'
import './libs/jquery.qrcode.min'

import '../css/common/common.less'
// import '../css/login_copy.less'
import '../css/login.less'

class LoginPage {
    constructor() {
        this.seconds = 60;
        this.intervalId = 0;
        this.defaultLoginType = 'pwd';
        this.config = {
            pwd: `<form class="form-wrap">
                    <input class="input-box" type="text" id="user" name="user" placeholder="工号 / 邮箱 / 手机号 / 身份证">
                    <span class="pwd-box">
                        <input class="input-box" type="password" id="pwd" name="password" placeholder="请输入登陆密码">
                        <i class="see-pwd-icon" id="seePwdBtn"></i>
                    </span>
                    <input class="submit-btn" type="submit" name="" value="登陆" id="loginBtn">
        
                    <div class="tip-box">
                        <div class="remember-wrap" id="rememberBtn">
        
                            <label class="unchecked checked">
                                <input id="rememberBox" class="checkbox" type="checkbox" name="" value="">
                            </label>
                            <span>记住密码</span>
                        </div>
                        <span id="forgetBtn" class="forget-link">忘记密码？</span>
                    </div>
                </form>`,
            code: `<form class="form-wrap">
                    <input class="input-box" type="text" id="user" name="user" placeholder="手机号">
        
                    <span class="code-box">
                        <input class="input-box" type="text" id="pwd" name="password" placeholder="验证码">
                        <input type="button" class="submit-btn" value="发送验证码" id="sendCodeBtn">
                    </span>
        
                    <input class="submit-btn" type="submit" name="" value="登陆" id="loginBtn">
                </form>`,
            qrCode: `<div class="qr-code-wrap">
                        <!--<img src="../img/qrCode.png" alt="">-->
                        <div id="qrCode"></div>
                        <p>请扫码登陆</p>
                    </div>`,
        }
    }
    init() {
        this.checkPwd();
        this.login();
        this.rememberPwd();
        this.seePwd();
        this.sendCode();
        this.testLoading();
        this.changeLoginType();
    }

    changeLoginType() {
        $('#loginWrap').html(this.config['pwd']);
        let _this = this;
        $('#loginTypeBar').on('click', 'li', function (e) {
            const target = e.target;
            $(target).siblings().each((index, ele) => {
                $(ele).removeClass('chosen-item')
            })
            $(target).addClass('chosen-item')
            let type = target.dataset.type;
            $('#loginWrap').html(_this.config[type])
            if (type === 'qrCode'){
                $('#qrCode').qrcode({
                    render: "canvas", //也可以替换为table
                    width: 185,
                    height: 185,
                    text: "http://www.jq22.com"
                });
            }
        })
    }

    testLoading() {
        let idNum = $.startProgress()
        setTimeout(function () {
            $.stopProgress(idNum)
        }, 500)
    }

    checkPwd() {
        $('#user').focus();
        // 判断cookie里是否保存了密码
        let user = getCookie('user');
        let pwd = getCookie('pwd');
        if(user !== "" && pwd !== ""){
            $("#user").val(user);
            $("#pwd").val(pwd);
        }
    }

    login() {
        let _this = this;
        $('#loginWrap').on('click', '#loginBtn', function(e) {
            e.preventDefault()
            console.log('loginBtn')
            let data = {
                user: $('#user').val(),
                pwd: $('#pwd').val()
            }
            location = '../index.html';
            setCookie('user', data.user, 1)
            setCookie('pwd', data.pwd, 1)

            // console.log('data', data)
            if (_this.intervalId) {
                clearInterval(_this.intervalId)
            }
            sessionStorage['testKey'] = 'login'
            // $.sendReq({
            //     url: '/login',
            //     type: 'POST',
            //     data: data,
            //     success: (json) => {
            //         console.log(json)
            //     }
            // })
            // $.ajax({
            //     url: '',
            //     type: 'POST',
            //     data: {
            //         user: '张三',
            //         pwd: '王五'
            //     },
            // })
            // .success(function() {
            //     console.log("success");
            // })
            // .fail(function() {
            //     console.log("error");
            // })
        })
    }

    rememberPwd() {
        $("#loginWrap").on("click", '#rememberBtn', function(event){
            if (event.target.nodeName !== 'INPUT') {
                const className = 'checked';
                let labelTag = $(this).children('label');
                if (labelTag.hasClass(className)) {
                    labelTag.removeClass(className)
                } else {
                    labelTag.addClass(className)
                    // 存储cookie
                    console.log('user')
                }
            }
        })
    }

    seePwd() {
        $('#loginWrap').on('click', '#seePwdBtn', function () {
            let target = $(this).prev("#pwd");
            if (target.val()) {
                if (target.attr('type') === 'text') {
                    target.attr('type', 'password')
                    $(this).removeClass('hide-pwd-icon');
                } else {
                    target.attr('type', 'text')
                    $(this).addClass('hide-pwd-icon');
                }
            }
        })
    }

    sendCode() {
        let _this = this;
        $('#loginWrap').on('click', '#sendCodeBtn', function (e) {
            let target = e.target;
            let phone = $('#user').val();
            if(!(/^1[34578]\d{9}$/.test(phone))){
                alert("手机号码有误");
                return
            } else {
                $(target).attr('disabled', true).addClass('disabled-cls').val(`${_this.seconds}秒后重发`);
                _this.intervalId = setInterval(function () {
                    if (_this.seconds === 0) {
                        clearInterval(_this.intervalId)
                        $(target).attr('disabled', false).removeClass('disabled-cls').val('发送验证码')
                    } else {
                        --_this.seconds;
                        $(target).val(`${_this.seconds}秒后重发`);
                    }
                }, 1000)
            }
        })
    }
}


$(function() {
    let loginPage = new LoginPage()
    loginPage.init();
})
