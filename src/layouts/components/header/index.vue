<template>
  <div class="navbar-header">
    <div v-if="getNavMode === 'horizontal'" class="horizontal-nav-left">
      <PageAsideMenu
        mode="horizontal"
        class="navbar-header-left-menu"
      ></PageAsideMenu>
    </div>
    <!-- 顶部菜单 -->

    <!-- left -->
    <div v-else class="navbar-header-left">
      <div class="navbar-header-left-toggle-menu" @click="menuIconClick">
        <el-icon :size="24">
          <Fold v-if="!collapsed" />
          <Expand v-else />
        </el-icon>
      </div>

      <!-- 面包屑 -->
      <el-breadcrumb v-if="breadCrumb.show" separator="/">
        <el-breadcrumb-item
          v-for="item in route.matched"
          :key="(item as RouteLocationMatched).name"
          >{{ (item as RouteLocationMatched).meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <!-- right -->
    <div class="layout-header-right">
      <!-- 设置 -->
      <div @click="openSetting">
        <el-icon :size="24">
          <Setting />
        </el-icon>
      </div>
    </div>

    <!-- 展开收起菜单 -->
  </div>

  <!-- 项目配置 -->
  <ProjectSetting ref="drawerSetting"></ProjectSetting>
</template>

<script setup lang="ts" name="PageHeader">
import ProjectSetting from './projectSetting.vue'
import { PageAsideMenu } from '@/layouts/components/aside'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { RouteLocationMatched, useRoute } from 'vue-router'
import { Fold, Expand, Setting } from '@element-plus/icons-vue'
import { useDesignSettingStoreWithOut } from '@/store/modules/designSetting'
import { computed, ref, watch } from 'vue'

interface Props {
  collapsed: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const { getCrumbsSetting, getNavMode } = useProjectSetting()
const designSetting = useDesignSettingStoreWithOut()

const route = useRoute()
const breadCrumb = getCrumbsSetting

const drawerSetting = ref()

const openSetting = () => {
  const { openDrawer } = drawerSetting.value
  openDrawer()
}

watch(
  () => designSetting.getAppTheme,
  (val) => {
    console.log(val)
  }
)

const emits = defineEmits<{
  (e: 'update:collapsed', collapse: boolean)
}>()

const collapsed = computed({
  get: () => props.collapsed,
  set: (val) => {
    return emits('update:collapsed', val)
  }
})

const menuIconClick = () => {
  collapsed.value = !collapsed.value
}
</script>

<style scoped lang="scss">
.navbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  margin: 20px 16px 0 16px;

  .horizontal-nav-left {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &-left-menu {
    display: flex;
    flex: 1;
  }

  &-left {
    display: flex;
    align-items: center;

    &-toggle-menu {
      box-sizing: border-box;
      margin: 0 16px;
    }
  }
}
</style>
