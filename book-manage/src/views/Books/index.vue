<template>
  <div class="booksInfo">
    <a-card>
      <h2>图书列表</h2>
      <!-- divider 分割线 -->
      <a-divider />
      <spaceBetween>
        <div class="search">
          <a-input-search placeholder="根据书名搜索" enter-button />
        </div>
        <div calss="btn"><a-button @click="show=true">添加一条</a-button></div>
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
        {{formatTimestamp(data.record.publishDate)}}
      </template>
      </a-table>
      <space-between>
        <div></div>
        <a-pagination style="margin-top:24px" 
        v-model:current="curPage"
        :total="total"
        :page-size="3"
        @change="setPage"/>
      </space-between>
    </a-card>
    <!-- @setshow 是自定义的一个事件 -->
    <!-- <add-one :show="show" @setShow="setShow" /> -->
    <add-one v-model:show="show" />
  </div>
</template>
<script src="./index.js">
</script>
<style lang='scss' scope>
@import "./index.scss";
</style>