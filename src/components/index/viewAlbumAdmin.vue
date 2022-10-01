<template>
    <el-row :gutter="20" class="viewAlbum">
        <el-col :col="24" class="pageHeader">
            <back></back>
        </el-col>
        <!-- 管理按钮 -->
        <el-col :col="24" :xs="24">
            <div v-show="!selectState">
                <router-link :to="`/admin/addAlbum/putImg/${nowAlbumId}`" >
                    <el-button  type="primary" size="small" plain>
                        上传图片
                    </el-button>
                </router-link>
                <el-button type="primary" size="small" plain @click="changeSelectState">管理</el-button>
            </div>
            <div v-show="selectState">
                <el-button type="primary" size="small" plain @click="selectAll">全选</el-button>
                <el-button type="primary" size="small" plain @click="selectAllCancel">取消选中</el-button>
                <el-button type="primary" size="small" plain @click="selectDel">删除选中</el-button>
                <el-button type="primary" size="small" plain @click="changeSelectState">取消</el-button>
            </div>
        </el-col>
        <!-- 内容展示 -->
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

                    <!-- 遮罩 -->
                    <div class="img-mask" v-show="selectState">
                        <div class="img-select-bg" @click="v.isSelect = !v.isSelect"></div>
                        <el-checkbox class="img-describe" v-model="v.isSelect" label></el-checkbox>
                    </div>
                </el-col>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { mapState } from "vuex"
import back from "./components/back.vue";

export default ({
    name: "viewAlbumAdmin",
    data() {
        return {
            selectState: false, // 切换选择状态
            nowAlbumId: null,   // 现在的相册
        }
    },
    computed: {
        // 相册列表和点开浏览图列表，遍历时通过url参数选择遍历的相册
        ...mapState(['imgList', 'previewList']),
    },
    methods: {
        // 这个参数是一个对象，包含相册id
        getImgList(param) {
            this.$store.dispatch('getImgList', param)
        },
        putImg() {
            this.$store.dispatch("putImg", {
                "album_id": this.nowAlbumId,
            });
        },
        // 切换状态
        changeSelectState() {
            this.selectState = !this.selectState;
        },
        // 选择全部
        selectAll() {
            this.$store.commit('selectAll', this.imgList[this.$route.params.id]);
        },
        // 取消选中
        selectAllCancel() {
            this.$store.commit('selectAllCancel', this.imgList[this.$route.params.id])
        },
        // 删除选中
        selectDel() {
            // 删除时提交到actions进行服务器请求
            this.$store.dispatch('selectDel', {
                "album_id": this.nowAlbumId,
                "album_list": this.imgList[this.$route.params.id],
                
            })
        },
    },
    mounted() {
        this.getImgList({ "album_id": this.$route.params.id });
        // 通过路径传递相册参数：album_id album_name
        this.nowAlbumId = this.$route.params.id;
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
    padding-right: 0 !important;
}
.demo-image__preview-item {
    position: relative;
    display: inline-block;
}

.img-mask {
    position: absolute;
    top: 3%;
    left: 10%;
    box-sizing: border-box;
    display: block;
    text-align: left;
    width: 90%;
    height: 90%;
    padding: 9px 20px 9px 10px;
}
.img-select-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(68, 68, 68, 0.4);
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
