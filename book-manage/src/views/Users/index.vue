<template>
  <div class="userManage">
    <a-card v-only-admin>
      <h2>用户管理</h2>

      <a-divider></a-divider>
      <div class="between">
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
          <template #character="{ record }">
            <a href="javascript:;"><EditOutlined @click="onEdit(record)" /></a>
            {{ getCharacterInfoById(record.character).title }}
          </template>
          <template #createdAt="{ record }">
            {{ formatTimestamp(record.meta.createAt) }}
          </template>
          <template #actions="record">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a
            >&nbsp;
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
        <!-- 弹框组件 -->
        <a-modal v-model:visible="showEditCharacterModal" title="修改角色" @ok="updateCharacter">
          <a-select v-model:value="editForm.character" style="width: 220px">
            <a-select-option
              v-for="item in characterInfo"
              :key="item._id"
              :value="item._id"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-modal>
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
