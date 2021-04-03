<template>
  <div>
    <!-- 能够显示隐藏的对话框 -->
    <a-modal
      title="添加用户"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <!-- label-col与wrapper-col 对应显示上的左右布局占比， -->
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="账号">
          <a-input v-model:value="addForm.accound" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="角色">
          <a-select 
          v-model:value="addForm.character"
          style ="width:220px;">
            <a-select-option
              v-for="item in characterInfo"
              :key="item._id"
              :value="item._id"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang='scss' scoped>
</style>