<template>
    <div class="page_content">
        <!-- 添加用户时弹出的对话框 -->
        <el-dialog v-model="isAdding" title="添加用户" width="30%" center :close-on-click-modal="false">
            <el-form label-position="top" label-width="100px" :model="addForm" style="max-width: 460px" :rules="rules">
                <el-form-item label="用户名" required prop="username">
                    <el-input v-model="addForm.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input type="password" v-model="addForm.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model.number="addForm.mobile" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="addForm.email" placeholder="请输入邮箱" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitAdd">确定</el-button>
                    <el-button type="danger" @click="isAdding = !isAdding">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑用户时弹出的对话框 -->
        <el-dialog v-model="isEditing" title="编辑用户" width="30%" center :close-on-click-modal="false">
            <el-form label-position="top" label-width="100px" :model="editForm" style="max-width: 460px" :rules="rules">
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model.number="editForm.mobile" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editForm.email" placeholder="请输入邮箱" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitEdit">确定</el-button>
                    <el-button type="danger" @click="isEditing = !isEditing">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 搜索栏/添加按钮 -->
        <div class="flex-float">
            <el-input class="input_search" v-model="keyword" placeholder="请输入用户名">
                <template #append>
                    <el-button @click="search">
                        <el-icon>
                            <Search />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>
            <el-button type="primary" @click="isAdding = !isAdding"> 新建用户</el-button>
        </div>
        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%" :height="670">
            <el-table-column prop="username" label="姓名" width="180" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="mobile" label="电话" />
            <el-table-column prop="role_name" label="角色" />
            <el-table-column label="状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.mg_state" @change="(val) => { changeUserState(scope.row.id, val) }" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="editUser(scope.row.id)">编辑</el-button>
                    <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <Pagination :total="pageData.total" :pagenum="pageData.pagenum" :pagesize="pageData.pagesize"
            @pageChange="pageChange" />
    </div>
</template>

<script setup>
import { getUserListApi, addUserApi, deleteUserApi, changeUserStateApi, editUserApi } from '@/util/request'
import { ref, reactive } from 'vue'
import Pagination from '@/components/Pagination.vue'
const tableData = ref([])
//分页数据(初始值)
const pageData = reactive({
    total: 0,
    pagenum: 1,
    pagesize: 12
})
//请求表格相关数据
const updateList = (query) => {
    getUserListApi({
        query,
        pagenum: pageData.pagenum,
        pagesize: pageData.pagesize
    }).then(res => {
        pageData.total = res.data.total
        //console.log(pageData.total)
        tableData.value = res.data.users
    })
}
updateList()
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
//搜索用户
const keyword = ref('')
const search = () => {
    updateList(keyword.value)
}
//添加用户
const isAdding = ref(false)
const addForm = reactive({
    username: '',
    password: '',
    mobile: null,
    email: '',
})
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { max: 10, message: '长度应不超过10个字符', trigger: 'blur' },
    ],
    mobile: [
        { type: 'number', message: '请输入正确的手机号', trigger: 'blur' },
    ]
}
const submitAdd = () => {
    addUserApi(addForm).then(res => {
        //console.log(res)
        if (res.data) {
            updateList()
            isAdding.value = false
        }
    })
}
//删除用户
const deleteUser = ({ id }) => {
    deleteUserApi(id).then(res => {
        //console.log(res)
        if (!res.data) {
            updateList()
        }
    })
}
//修改用户状态
const changeUserState = (id, val) => {
    console.log(id, val)
    changeUserStateApi(id, val).then(res => {
        console.log(res)
    })
}
//编辑用户
const isEditing = ref(false)
const editForm = reactive({
    id: null,
    mobile: null,
    email: ''
})
const editUser = id => {
    editForm.id = id
    isEditing.value = !isEditing.value
}
const submitEdit = () => {
    editUserApi(editForm).then(res => {
        if (res.data) {
            updateList()
            isEditing.value = !isEditing.value
        }
    })
}
</script>

<style scoped>
.input_search {
    width: 200px;
}

.flex-float {
    margin-bottom: 20px;
}
</style>