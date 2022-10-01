<template>
    <el-row :gutter="4" class="addAlbum">
        <el-col :col="24" class="pageHeader">
            <back></back>
        </el-col>
        <el-col :col="24" :xs="24" class="addAlbumBox">
            <el-form
                label-position="top"
                ref="numberValidateForm"
                label-width="100px"
                class="demo-ruleForm addAlbumForm"
            >

                <el-form-item label="请选择图片">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="beforeAvatarUpload"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                    >
                    <!-- 暂时只支持一次上传一个 -->
                        <img v-show="imageUrl[0]" :src="imageUrl[0]" class="avatar" />
                        <i v-show="!imageUrl[0]" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import back from "./components/back.vue";
export default {
    name: "putImg",
    data() {
        return {
            fileFormat: [
                "image/jpeg",
                "image/png",
                "image/gif",
            ],
            imageUrl: [],
            image: null,
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl.splice(0,1,URL.createObjectURL(file.raw));
        },
        beforeAvatarUpload(file) {
            const isJPG = this.fileFormat.indexOf(file.raw.type) == "-1";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (isJPG) {
                return this.$message.error('上传头像图片只能是 JPG/png/gif 格式!');
            }
            if (!isLt2M) {
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.image = file.raw;
            this.imageUrl.splice(0,1,URL.createObjectURL(file.raw));
            return isJPG && isLt2M;
        },
        // 取消
        resetForm() {
            this.imageUrl = [];
        },
        // 提交
        submitForm() {
            if(!this.imageUrl){
                return this.$message.error('请选择图片！');
            }
            this.$store.dispatch("putImg", {
                "album_id": this.$route.params.id,
                "image" : this.image,
            });
        },

    },
    components:{
        back
    }
}
</script>

<style scoped>
.pageHeader {
    padding: 8px 15px !important;
}
.addAlbum {
    /* display: flex; */
    text-align: left;
}
.addAlbumForm {
    width: 70%;
    margin: 0 auto;
}
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid rgb(179, 179, 179);
    background-color: #ffffff;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
