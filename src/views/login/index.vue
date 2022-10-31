<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="0"
    class="login-ruleForm"
    @keyup.enter="submitForm(ruleFormRef)"
  >
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名 admin or user"
        size="large"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model.number="ruleForm.password"
        type="password"
        size="large"
        placeholder="请输入密码 123456"
      />
    </el-form-item>
    <el-button
      size="large"
      type="primary"
      style="width: 100%"
      @click="submitForm(ruleFormRef)"
      >登 录</el-button
    >
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { login } from '@/api'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

interface LoginForm {
  username: string
  password: string
}

const ruleFormRef = ref<FormInstance>()

const ruleForm: LoginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const loginFetch = async (params: LoginForm) => {
  const { msg, data } = await login(params)

  if (!data?.token) {
    ElMessage({
      message: msg,
      type: 'error'
    })
  } else {
    Cookies.set('token', data.token)
    router.push('/')
  }
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginFetch(ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped lang="scss">
.login-ruleForm {
  width: 350px;
  background-color: #ddd;
  padding: 60px 40px 50px 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
