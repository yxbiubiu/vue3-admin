<template>
    <div class="page_content">
        <!-- 新建角色时弹出的对话框 -->
        <el-dialog v-model="isAdding" title="添加角色" width="30%" center :close-on-click-modal="false">
            <el-form label-position="top" label-width="100px" :model="addForm" style="max-width: 460px" :rules="rules">
                <el-form-item label="角色名" required prop="roleName">
                    <el-input v-model="addForm.roleName" placeholder="请输入角色名" />
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="addForm.roleDesc" placeholder="请输入角色描述" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitAdd">确定</el-button>
                    <el-button type="danger" @click="isAdding = !isAdding">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 编辑角色时弹出的对话框 -->
        <el-dialog v-model="isEditing" title="编辑角色" width="30%" center :close-on-click-modal="false">
            <el-form label-position="top" label-width="100px" :model="editForm" style="max-width: 460px" :rules="rules">
                <el-form-item label="角色名" required prop="roleName">
                    <el-input v-model="editForm.roleName" placeholder="请输入角色名" />
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input v-model="editForm.roleDesc" placeholder="请输入角色描述" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submitEdit">确定</el-button>
                    <el-button type="danger" @click="isEditing = !isEditing">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="isAdding = !isAdding"> 新建角色</el-button>
        <!-- 角色列表 -->
        <el-table :data="roleData" style="width: 100%" table-layout="fixed" class="roleList">
            <el-table-column prop="roleName" label="角色名" />
            <el-table-column prop="roleDesc" label="角色描述" />
            <el-table-column label="操作" width="200px">
                <template #default="scope">
                    <el-button type="primary" @click="editRole(scope.row.id)">编辑</el-button>
                    <el-button type="danger" @click="deleteRole(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { getRoleListApi, addRoleApi, deleteRoleApi, editRoleApi } from '@/util/request'
//获取角色列表
const roleData = ref([])
const updateList = () => {
    getRoleListApi().then(res => {
        roleData.value = res.data
    })
}
updateList()
//添加角色
const isAdding = ref(false)
const rules = {
    roleName: [
        { required: true, message: '角色名不能为空', trigger: 'blur' },
        { max: 8, message: '长度应不超过8个字符', trigger: 'blur' },
    ]
}
const addForm = reactive({
    roleName: '',
    roleDesc: ''
})
const submitAdd = () => {
    addRoleApi(addForm).then(res => {
        if (res.data) {
            console.log(res)
            updateList()
            isAdding.value = !isAdding
        }
    })
}
//删除角色
const deleteRole = id => {
    deleteRoleApi(id).then(res => {
        updateList()
    })
}
//编辑角色
const isEditing = ref(false)
const editForm = reactive({
    id: null,
    roleName: '',
    roleDesc: ''
})
const editRole = id => {
    isEditing.value = !isEditing.value
    editForm.id = id
}
const submitEdit = () => {
    editRoleApi(editForm).then(res => {
        if (res.data) {
            updateList()
            isEditing.value = !isEditing.value
        }
    })
}
</script>

<style scoped>
.roleList {
    margin-top: 20px;
}
</style>