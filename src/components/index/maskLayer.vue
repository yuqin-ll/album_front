<template>
    <el-row class="mask">
        <el-col :xs="24">
            <el-button type="primary" class="mask-btn">
                <router-link :to="`admin/viewAlbumAdmin/${album_id}/${album_name}`">查看相册</router-link>
            </el-button>
        </el-col>
        <el-col :xs="24">
            <el-button type="primary" class="mask-btn">
                <router-link :to="`admin/editAlbum/${album_id}/${album_name}`">编辑相册</router-link>
            </el-button>
        </el-col>
        <el-col :xs="24">
            <el-button type="danger" class="mask-btn" @click="delAlbum">
                删除相册
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "maskLayer",
    props: ["album_id", "album_name"],
    methods:{
        delAlbum(){
            this.$store.dispatch("delAlbum", {
                "album_id" : this.album_id,
                "force_del" : 1 // 确认删除
            });
            
        }
    }
}
</script>

<style scoped>
.mask {
    position: absolute;
    top: 2.7%;
    left: 1%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 999;
    width: 98%;
    height: 96%;
    border-radius: 5px;
    background-color: rgba(39, 39, 39, 0.3);
}
/* .mask:hover{
    animation-name: mask-top;
    animation-duration: 1s;
} */
.mask-btn {
    margin: 4px;
}
.mask-btn a{
    color: #333;
    text-decoration: none;
}
@keyframes mask-top {
    0% {
        top: 100%;
    }
    100% {
        top: 2.7%;
    }
}
</style>