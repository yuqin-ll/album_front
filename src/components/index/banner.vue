<template>
    <el-row :gutter="10">
        <el-col :push="3" :xs="18" :sm="18" :md="18" :lg="18" class="banner">
            <h2 class="banner-title">美图欣赏</h2>
            <div class="banner-describe">
                <p>美图欣赏主题-为壁纸、照片、相册而生</p>
            </div>
        </el-col>
    </el-row>
</template>

<script>

export default {
    name: "banner",
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.banner{
    /* padding-top: 30px; */
    padding-bottom: 30px;
}
.banner-title{
    font-weight: 400;
    margin: 15px 10px;
}
.banner-describe{
    font-size: 14px;
}
</style>
