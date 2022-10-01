<template>
    <el-row :gutter="20" class="viewAlbum">
        <el-col :col="24" class="pageHeader">
            <back></back>
        </el-col>
        <el-col :xs="24" class="img-main">
            <!-- 展示位置-原图 -->
            <div class="demo-image__preview">
                <el-col
                    :xs="8"
                    class="demo-image__preview-item"
                    v-for="v in imgList[$route.params.id]"
                    :key="v.id"
                >
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="v.path"
                        :preview-src-list="previewList[$route.params.id]"
                        fit="cover"
                        shadow="hover"
                        lazy
                    ></el-image>
                </el-col>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapState } from "vuex"
import back from "./components/back.vue";

export default ({
    name: "viewAlbum",
    data() {
        return {
            nowAlbumId: null,
            album_name: "",
        }
    },
    computed: {
        // 相册列表和点开浏览图列表
        ...mapState(['imgList', 'previewList'])
    },
    methods: {
        // 这个参数是一个对象，包含相册id
        getImgList(param) {
            this.$store.dispatch('getImgList', param)
        },
        goBack() {
            this.$router.go(-1)
        },
    },
    mounted() {
            this.getImgList({ "album_id": this.$route.params.id });
        
        // 通过路径传递相册参数：album_id album_name
        this.nowAlbumId = this.$route.params.id ? this.$route.params.id : null;
        this.album_name = this.$route.params.album_name ? this.$route.params.album_name : null;
    },
    components: {
        back
    }
})
</script>

<style scoped>
.pageHeader {
    padding: 8px 0;
    /* background-color: #dfdfdf; */
}
.album-content {
    width: 100%;
}
.album-box {
    width: 100%;
    height: 200px;
    text-align: center;
    background-color: black;
}
.album-img {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.thumbnail-list {
    display: flex;
    list-style-type: none;
}
.thumbnail-list-item {
    width: 50px;
    height: 50px;
    background-color: #dddfe2;
}
.thumbnail-img {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.img-main {
    /* 解决ui库本身会有向右偏移10px的问题 */
    padding-left: 0 !important;
}
.demo-image__preview-item {
    position: relative;
    display: inline-block;
}
</style>
<style>
.viewAlbum .el-carousel__container {
    height: 200px !important;
}
.viewAlbum .demo-image__preview {
    margin: 8px;
    text-align: left !important;
}
.viewAlbum .el-image {
    width: 100% !important;
    box-sizing: border-box;
    padding: 3px 3px;
}
</style>
