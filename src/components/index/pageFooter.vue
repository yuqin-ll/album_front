<template>
    <div class="footer">
        <el-row :gutter="10" type="flex" justify="center" >
            <el-col :xs="22">
                <div class="grid-content footer-text">
                    Copyright © 2022 个人相册网站
                    <span class="text-block">版权所有：2086217046@qq.com</span>
                    &nbsp;
                    <!-- <span class="text-block"></span> -->
                </div>
            </el-col>
        </el-row>
        <el-row class="a">
            <el-col :xs=24>
                <div class="bottom-fill"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default ({
    name: "pageFooter",
    data() {
        return {

        }
    },
    methods: {},
    muount() {

    }
})
</script>

<style scoped>
.footer {
    text-align: center;
    font-size: 14px;
}
.footer-text{
    margin-top: 10px;
    margin-bottom: 10px;
}
.text-block{
    display: inline-block;
}
.bottom-fill {
    width: 100%;
    height: 60px;
    background-color: #434a54;
}
</style>
