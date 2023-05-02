<template>
    <el-pagination background layout="prev, pager, next" :total="props.total" :page-size='props.pagesize'
        v-model:current-page="pagenum" @update:current-page="change" />
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    total: Number,
    pagenum: Number,
    pagesize: Number
})
const pagenum = ref(props.pagenum)
const emits = defineEmits(['pageChange'])
const change = () => {
    emits('pageChange', pagenum)
}
</script>

<style scoped>
.el-pagination {
    justify-content: center;
    margin-top: 20px;
}
</style>