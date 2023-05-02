<template>
    <div class="common-layout">
        <el-container>
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img src="@/assets/logo.png" alt="加载失败" class="logo">
                    <h1 class="title">商铺后台管理系统</h1>
                </div>
                <el-button type="danger" @click="loginOut">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" class="common-aside">
                    <el-menu background-color="#545c64rgb(24, 28, 34)" text-color="#fff" :router="true"
                        :default-active="title">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span>账号管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="users">
                                    <el-icon>
                                        <Grid />
                                    </el-icon>
                                    <span>账号列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                                <span>角色管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="roles">
                                    <el-icon>
                                        <Menu />
                                    </el-icon>
                                    <span>角色列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Goods />
                                </el-icon>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="goods">
                                    <el-icon>
                                        <List />
                                    </el-icon>
                                    <span>商品列表</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const store = useStore()
const title = route.name
const loginOut = () => {
    localStorage.removeItem('token')
    store.commit('setUserInfo', '')
    alert('退出登录成功！')
    router.push({
        path: '/login'
    })
}
</script>

<style scoped>
.el-container {
    height: 100vh;
    overflow: hidden;
}

.el-main {
    background-color: #efefef;
}

.common-header {
    background-color: rgb(48, 55, 65);
    display: flex;
}

.common-aside {
    background-color: rgb(24, 28, 34);
}

.logo {
    width: 60px;
}

.title {
    color: #61dafb;
}
</style>