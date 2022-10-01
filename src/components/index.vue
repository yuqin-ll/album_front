<template>
    <div class="index">
        <div class="bgImg">
            <img src="/images/lol-lacs.jpg" alt />
        </div>
        <navigation></navigation>
        <div class="body">
            <router-view></router-view>
        </div>
        <pageFooter></pageFooter>
    </div>
</template>

<script>
import navigation from './index/navigation'
import pageFooter from "./index/pageFooter"

export default ({
    name: "index",
    data() {
        return {

        }
    },
    components: {
        navigation,
        pageFooter,
    },
    mounted() {

    },
})
</script>

<style scoped>
.index {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    text-align: center;
}
.body {
    /* padding: 0 15px; */
}
.bgImg {
    position: fixed;
    top: 0px;
    left: 60px;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: -6;
    /* filter: blur(1px); */
    opacity: 0.1;
    background-color: rgba(229, 229, 229, 0.2);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
