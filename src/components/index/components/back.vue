<template>
    <div>
        <el-page-header @back="goBack" :content="$route.params.title"></el-page-header>
    </div>
</template>

<script>
export default {
    name: "back",
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>
