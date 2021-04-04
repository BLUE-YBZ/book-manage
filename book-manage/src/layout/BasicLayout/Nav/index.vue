<template>
  <div>
    <a-menu
      style="width: 100%"
      mode="inline"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      v-for="item in menu"
      :key="item.url"
      v-only-admin ="item.onlyAdmin"
      
    >
      <a-sub-menu v-if="item.children">
        <template #title>
          <span>
            <MailOutlined />
            <span>{{ item.title }} </span>
          </span>
        </template>
        <!-- <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item> -->
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" :key="item.url" v-else>{{ item.title }} </a-menu-item>
    </a-menu>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss">
@import "./index.scss";
</style>