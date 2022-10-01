<template>
    <el-row :gutter="4" class="addAlbum">
        <el-col :col="24" class="pageHeader">
            <back></back>
        </el-col>
        <el-col :col="24" :xs="24" class="addAlbumBox">
            <el-form
                :model="ruleForm"
                :rules="rules"
                label-position="top"
                ref="numberValidateForm"
                label-width="100px"
                class="demo-ruleForm addAlbumForm"
            >
                <el-form-item label="相册名称" prop="album_name">
                    <el-input v-model="ruleForm.album_name"></el-input>
                </el-form-item>

                <el-form-item label="上传相册封面">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="beforeAvatarUpload"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import back from "./components/back.vue";
export default {
    name: "addAlbum",
    data() {
        return {
            fileFormat: [
                "image/jpeg",
                "image/png",
                "image/gif",
            ],
            title: "",
            ruleForm: {
                album_name: "",
            },
            rules: {
                album_name: [
                    { required: true, message: '请输入相册名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
            },
            imageUrl: "",
            image: null,
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(11);
        },
        beforeAvatarUpload(file) {
            console.log(file);
            const isJPG = this.fileFormat.indexOf(file.raw.type) == "-1";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (isJPG) {
                return this.$message.error('上传头像图片只能是 JPG/png/gif 格式!');
            }
            if (!isLt2M) {
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.image = file.raw;
            this.imageUrl = URL.createObjectURL(file.raw);
            return isJPG && isLt2M;
        },
        // 重置
        resetForm() {
            this.ruleForm.album_name = "";
            this.imageUrl = "";
        },
        // 提交
        submitForm() {
            this.$store.dispatch('addAlbum', {
                "album_name" : this.ruleForm.album_name,
                "album_cover_img" : this.image,
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
