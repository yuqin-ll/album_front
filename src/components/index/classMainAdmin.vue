<template>
    <el-row :gutter="4" class="classMain">
        <banner></banner>
        <el-col class="classMainItem" :xl="12" :xs="12" :sm="12" :md="6" :lg="6">
            <router-link to="/admin/addAlbum/添加相册" class="to-album">
                <el-card :body-style="{ padding: '8px'}">
                    <div class="classExhibitionBox avatar-uploader">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                    <div class="classExhibitionText">
                        <span>添加相册</span>
                    </div>
                </el-card>
            </router-link>
        </el-col>
        <el-col
            class="classMainItem"
            :xl="12"
            :xs="12"
            :sm="12"
            :md="6"
            :lg="6"
            v-for="v in albumList"
            :key="v.id"
        >
            <el-card :body-style="{ padding: '8px'}">
                <div class="classExhibitionBox" @click="v.isShowMask = !v.isShowMask">
                    <img :src="`${v.cover_img}`" alt class="classExhibition" />
                    <!-- 遮罩 -->
                    <maskLayer v-show="v.isShowMask" :album_id="v.id" :album_name="v.album_name"></maskLayer>
                </div>
                <div class="classExhibitionText">
                    <span>{{v.album_name}}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import banner from "./banner.vue"
import maskLayer from "./maskLayer.vue"
import { mapState } from "vuex"

export default ({
    name: 'classMainAdmin',

    data() {
        return {};
    },
    computed: {
        ...mapState(['albumList']),
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch("getAlbumList");
    },
    components: {
        banner,
        maskLayer
    },
});
</script>

<style scoped>
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 160px;
    border: 1px solid rgb(179, 179, 179);
    line-height: 160px;
    text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-card__body {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.4);
}
.classMain {
    padding: 10px;
}
.classMainItem {
    position: relative;
    padding: 5px;
}
.classExhibitionBox {
    width: 100%;
    box-sizing: border-box;
}
.classExhibition {
    transition: all 0.5s;
    box-sizing: border-box;
    width: 100%;
    height: 10rem;
    object-fit: cover;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.classExhibitionText {
    padding: 6px 0 4px;
    line-height: 16px !important;
}
.classExhibitionText span {
    text-decoration-color: rgb(124, 124, 124);
}
.to-album {
    color: rgb(106, 106, 106);
    text-decoration: none;
}
</style>

<style>
.classMain .is-always-shadow::before {
    content: "";
    border-bottom: 1px solid transparent;
    box-shadow: 0 4px 8px rgb(0 0 0 / 6%);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 4px 8px rgb(0 0 0 / 6%);
    border-radius: 4px;
    display: block;
    position: absolute;
    top: 5%;
    left: 4%;
    height: 95%;
    width: 92%;
    z-index: -1;
    transition: 0.4s;
    background: #fff;
}
.classMain .is-always-shadow::after {
    content: "";
    border-bottom: 1px solid transparent;
    box-shadow: 0 4px 8px rgb(0 0 0 / 6%);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 4px 8px rgb(0 0 0 / 6%);
    border-radius: 4px;
    display: block;
    position: absolute;
    top: 4%;
    left: 2%;
    height: 95%;
    width: 96%;
    z-index: -1;
    transition: 0.4s;
    background: #fff;
}
</style>