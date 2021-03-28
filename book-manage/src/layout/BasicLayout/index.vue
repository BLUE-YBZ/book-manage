<template>
  <div class="basic-layout">
    <div class="toptitle">
      <div class="left">
        <img
          src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
          alt="图书管理系统的logo"
        />
        <span class="texttitle">图书管理系统</span>
      </div>
      <div class="right">
        <span>你好，admin</span>
        <span class="btnspan"> 退出</span>
      </div>
    </div>
    <div class="holderone"></div>
    <div class="content">
      <div class="left">菜单栏</div>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script src="./index.js">
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>