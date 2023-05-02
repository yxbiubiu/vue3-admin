<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
body {
  margin: 0;
  height: 100vh;
}

/* flex布局类名 */
.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
}

.page_content {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>