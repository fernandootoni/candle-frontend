<template>
  <div id="header">
    <img src="../assets/img/logo.png" alt="Bitcoin logo">
    <span>Bitcoin candle app</span>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Header extends Vue {

}
</script>

<style>
* {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#header {
  background-image: linear-gradient(to right, #4d05e8, #4871f7);
  padding: 30px 10px;
}

#header * {
  vertical-align: middle;
}

#header span {
  color: white;
  font-size: 200%;
  margin-left: 1rem;
  text-shadow: 1px 1px #666666;
}

#header img {
  width: 80px;
}
</style>

Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.