<template>
  <div>
    <!-- 能够显示隐藏的对话框 -->
    <a-modal title="添加书籍" :visible="props.show" @ok="submit" @cancel="close">
      <!-- label-col与wrapper-col 对应显示上的左右布局占比， -->
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="书名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
      </a-form>
      
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="库存数量">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
      </a-form>

      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="价格">
          <a-input-number v-model:value="addForm.price" :min="0" :max="9999" />
          <span>&nbsp;&nbsp;元</span>
        </a-form-item>
      </a-form>
      
    </a-modal>
  </div>
</template>
<script src="./index.js"></script>
<style lang='scss' scope>
</style>