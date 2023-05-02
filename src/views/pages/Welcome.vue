<template>
    <h1 class="welcome">欢迎来到用户管理系统，{{ username }}</h1>
</template>

<script setup>
import { useStore } from 'vuex'
const { username } = useStore().state.user.userInfo
</script>

<style scoped>
.welcome {
    text-align: center;
}
</style>