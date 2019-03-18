/**
 * 创建lockPage:锁屏页面
 */
export default function createLockPage(lockPageWrap) {

    let lockPage = `<div class="lock-content">
            <div class="content-wrap">
                <div class="time">
                    09:55
                </div>
                <div class="day">
                    <span>2019年1月17日</span>
                    <span>周四</span>
                </div>
                <span class="lock-user-name">用户名张三</span>
                <input type="text" class="lock-pwd-box" id="lockPwd" placeholder="请输入密码">
                <span class="lock-user-name">忘记密码</span>
                <div class="msg-wrap-box">
                    <div class="msg-item-box">
                        <i class="msg-item-1"></i>
                    </div>
                    <div class="msg-item-box">
                        <i class="msg-item-2"></i>
                    </div>
                    <div class="msg-item-box">
                        <i class="msg-item-3"></i>
                    </div>
                </div>
            </div>
        </div>`;

    lockPageWrap.html(lockPage)
}
