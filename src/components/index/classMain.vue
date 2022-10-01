<template>
    <el-row :gutter="4" class="classMain">
        <banner></banner>
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
            <router-link :to="`viewAlbum/${v.id}/${v.album_name}`" class="to-album">
                <el-card :body-style="{ padding: '8px'}" >
                    <div class="classExhibitionBox">
                        <img :src="`${v.cover_img}`" alt="" class="classExhibition">
                    </div>
                    <div class="classExhibitionText">
                        <span>{{v.album_name}}</span>
                    </div>
                </el-card>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
import banner from "./banner.vue"
import {mapState} from "vuex"
export default ({
    name: 'classMain',

    data() {
        return {};
    },
    computed:{
        ...mapState(['albumList']),
    },  
    methods:{
        // 这个参数是一个对象，包含相册id
        getImgList(param){
            this.$store.dispatch('getImgList',param)
        },
    },
    mounted(){
        // 如果有数据则不发起请求，用在切换页面情况下，避免发送多次请求
        this.$store.dispatch("getAlbumList");
    },
    components: {
        banner,
    },
});
</script>

<style scoped>
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
    object-fit: cover;
    width: 100%;
    height: 10rem;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
}
.classExhibitionText {
    padding: 6px 0 4px;
    line-height: 16px;
}
.classExhibitionText span {
    text-decoration-color: rgb(124, 124, 124);
}
.to-album{
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