<template>
  <div class="booksInfo">
    <a-card>
      <h2>图书列表</h2>
      <!-- divider 分割线 -->
      <a-divider />
      <spaceBetween>
        <div class="search">
          <a-input-search
            placeholder="根据书名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a href="javascript:;" @click="backAll" v-show="isSearch">返回</a>
        </div>
        <div calss="btn">
          <a-button @click="show = true">添加一条</a-button>
        </div>
      </spaceBetween>
      <a-divider />
      <!-- pagination 组件中控制分页显示的参数 -->
      <a-table
        class="tableInfo"
        :pagination="false"
        :columns="columns"
        :data-source="list"
        bordered="true"
      >
        <!-- 插槽 -->
        <template #publishDate="data">
          {{ formatTimestamp(data.record.publishDate) }}
        </template>
        <template #action="record">
          <a href="JavaScript:;" @click="remove(record)">删除</a>
        </template>
        <template #count="data">
          <a href="javascript:;" @click="updateCount('IN_COUNT', data.record)">入库</a>
          {{ data.record.count }}
          <a href="javascript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>
        </template>
      </a-table>
      <space-between>
        <div></div>
        <a-pagination
          style="margin-top: 24px"
          v-model:current="curPage"
          :total="total"
          :page-size="3"
          @change="setPage"
        />
      </space-between>
    </a-card>
    <!-- @setshow 是自定义的一个事件 -->
    <!-- <add-one :show="show" @setShow="setShow" /> -->
    <add-one v-model:show="show" />
  </div>
</template>
<script src="./index.jsx">
</script>
<style lang='scss' scope>
@import "./index.scss";
</style>