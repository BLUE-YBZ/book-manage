<template>
  <div class="userManage">
    <a-card>
      <h2>用户管理</h2>

      <a-divider></a-divider>
      <div class="between" >
        <div class="search">
          <a-input-search
            placeholder="根据书名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a href="javascript:;" @click="backAll" v-show="isSearch">返回</a>
        </div>
        <a-button class="btn" @click="show = true">添加一条</a-button>
      </div>


      
      <a-divider></a-divider>
      <div>
        <a-table
          bordered
          :pagination="false"
          :columns="columns"
          :data-source="list"
        >
          <template #createdAt="{ record }">
            {{ formatTimestamp(record.meta.createAt) }}
          </template>
          <template #actions="record">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>&nbsp;
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
      <div class="pages" v-if="!isSearch">
        <div class="pageItem"></div>
        <a-pagination
          class="pageItem"
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        />
      </div>
    </a-card>
    <!-- 添加用户时的弹窗 -->
    <add-one v-model:show="show" @getList="getUser"></add-one>
  </div>
</template>
<script src="./index.js"></script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
