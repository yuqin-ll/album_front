<template>
    <div id="app">
        <index></index>
    </div>
</template>

<script>
import index from "./components/index.vue"

export default {
    name: 'app',
    components: {
        index
    }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.el-border-1{
    border: 1px solid rgba(0, 0, 0, .12);
}
.el-shadow-base-shadow{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-shadow-light-color{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>
