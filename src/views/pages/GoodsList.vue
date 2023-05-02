<template>
    <div class="page_content">
        <!-- 搜索栏 -->
        <el-input class="input_search" v-model="keyword" placeholder="请输入商品名">
            <template #append>
                <el-button @click="search">
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-button>
            </template>
        </el-input>
        <!-- 商品列表 -->
        <el-table :data="goodData" style="width: 100%" table-layout="fixed" class="goodList" :height="670">
            <el-table-column prop="goods_name" label="商品名" />
            <el-table-column prop="goods_price" label="价格(￥)" />
            <el-table-column prop="goods_weight" label="商品重量(kg)" />
            <el-table-column prop="goods_state" label="商品状态" />
        </el-table>
        <!-- 分页栏 -->
        <Pagination :total="pageData.total" :pagenum="pageData.pagenum" :pagesize="pageData.pagesize"
            @pageChange="pageChange" />
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { getGoodListApi } from '@/util/request'
////分页数据(初始值)
const pageData = reactive({
    total: 0,
    pagenum: 1,
    pagesize: 7
})
const goodData = ref([])
//更新商品列表
const updateList = query => {
    getGoodListApi({
        query,
        pagenum: pageData.pagenum,
        pagesize: pageData.pagesize
    }).then(res => {
        pageData.total = res.data.total
        //修正商品状态
        for (let val of res.data.goods) {
            switch (val.goods_state) {
                case 0:
                    val.goods_state = '未通过'
                    break
                case 1:
                    val.goods_state = '审核中'
                    break
                case 2:
                    val.goods_state = '已审核'
                    break
                default:
                    break
            }
        }
        goodData.value = res.data.goods
    })
}
updateList()
//搜索商品
const keyword = ref('')
const search = () => {
    updateList(keyword.value)
}
//页码变化
const pageChange = pagenum => {
    pageData.pagenum = pagenum
    //非查询时
    if (!keyword.value) {
        updateList()
    } else {
        //查询时
        updateList(keyword.value)
    }
}
</script>

<style scoped>
.input_search {
    width: 200px;
}

.goodList {
    margin-top: 20px;
}
</style>