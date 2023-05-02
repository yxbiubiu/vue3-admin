<template>
    <div class="login-container">
        <div class="login">
            <div class="header">登录</div>
            <div class="container">
                <input type="text" placeholder="请输入用户名" v-model="loginMes.username">
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
            </div>
            <div class="container1">
                <input type="password" placeholder="请输入密码" v-model="loginMes.password">
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
            </div>
            <div class="btn" id="submit" @click="submit"><label for="submit">登录</label></div>
        </div>
    </div>
</template>
  
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { loginApi } from '@/util/request'
const loginMes = reactive({
    username: '',
    password: ''
})
const router = useRouter()
const store = useStore()
function submit() {
    loginApi(loginMes).then(res => {
        if (res.data) {
            store.commit('setUserInfo', res.data.token)
            localStorage.setItem('token', JSON.stringify(res.data.token))
            router.push({
                path: '/'
            })
        }
    }, err => {
        console.log(err)
    })
    /* store.commit('setUserInfo', loginMes)
    localStorage.setItem('loginData', JSON.stringify(loginMes))
    alert('登录成功！')
    router.push({
        path: '/'
    }) */
}
</script>
   
<style scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #395674;
}

.login {
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #14293e;
    opacity: .8;
}

.header {
    font-size: 38px;
    font-weight: bold;
    text-align: center;
    line-height: 200px;
    color: #61dafb;
}

.container {
    height: 30px;
    width: 250px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}

input {
    width: 100%;
    height: 100%;
    position: relative;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding-left: 5px;
    background-color: #282c34;
    color: #61dafb;
    caret-color: #61dafb;
}

input::placeholder {
    color: #61dafb;
}

span {
    position: absolute;
    content: "";
    display: block;
    background-color: #61dafb;
    transition: transform .1s ease-in-out;
}

.top,
.bottom {
    left: 0px;
    right: 0px;
    height: 2px;
}

.left,
.right {
    top: 0px;
    bottom: 0px;
    width: 2px;
    transform: scaleY(0);
}

.top {
    top: 0px;
    transform: scaleX(0);
    transform-origin: left center;
    transition-delay: .2s;
}

.left {
    left: 0px;
    transform-origin: bottom center;
    transition-delay: .3s;
}

.bottom {
    bottom: 0px;
}

.right {
    right: 0px;
    transform-origin: top center;
    transition-delay: .1s;
}

input:focus~.right {
    transform: scaleY(1);
    transform-origin: bottom center;
}

input:focus~.left {
    transform: scaleY(1);
    transform-origin: top center;
}

input:focus~.top {
    transform: scaleY(1);
    transform-origin: right center;
}

.container1 {
    height: 30px;
    width: 250px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.btn {
    position: absolute;
    left: 50%;
    top: 54%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 5px;
    width: 52%;
    margin-top: 40px;
    background-color: #61dafb;
    color: #fff;
}

.btn:hover {
    color: #61dafb;
    background-color: #fff;
}
</style>
  