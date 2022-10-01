import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    albumUrlConfig: {
        url: "http://127.0.0.1:9000/album/AlbumOperation/",
        getAlbumList: "getAlbumList",
        putAlbum: "putAlbum",
        editAlbum: "editAlbum",
        delAlbum: "delAlbum",
    },
    imgUrlConfig: {
        url: "http://127.0.0.1:9000/album/ImgOperation/",
        getImgList: "getImgList",
        putImg: "putImg",
        delImg: "delImg",
    },
    userConfig: {
        user_id: 1,
        album_id: null,
        imgPrefix: "http://127.0.0.1:9000/storage/",
    },
    // loading : true,
    // 相册列表
    albumList: [],
    /**
     * 需要的格式：
     * album_id : {
            id: 1,
            isSelect: false,
            path: '/images/英雄联盟拉克丝狗年皮肤原画4k壁纸3840x2160_彼岸图网.jpg',
        },
     */
    imgList: {},
    // 大屏预览图列表
    previewList: {},
}; // 数据
const getters = {} // 数据加工（计算属性）
const mutations = {
    addPreviewList(conText) {
        conText.srcList.forEach(e => {
            conText.previewList.push(e.url)
        })
    },
    // 选择全部
    selectAll(conText, value) {
        value.forEach(e => {
            e.isSelect = true;
        })
    },
    // 取消选择
    selectAllCancel(conText, value) {
        value.forEach(e => {
            e.isSelect = false;
        })
    },

    getAlbumList(conText, value) {
        // 因为服务器传过来的数据是以 /album...开头，所以得手动加上全url
        // 图片url：http://localhost:8000/storage/album////20220531//xxx.jpg
        value.forEach(e => {
            e.cover_img = conText.userConfig.imgPrefix + e.cover_img;
            e.isShowMask = false;
        });
        conText.albumList = value;
    },
    // 获取到图片数据，跳转到这里进行数据加工成最终格式
    getImgList(conText, value) {
        let previewPathList = [];
        value.data.forEach(e => {
            e.isSelect = false;
            e.path = conText.userConfig.imgPrefix + e.path;
            previewPathList.push(e.path);
        })
        // 设置一个新的值需要使用 set 方法设置，不然vue不能正确检测到
        Vue.set(conText.imgList, value.album_id, value.data);
        Vue.set(conText.previewList, value.album_id, previewPathList);
        // console.log(value);
    },
    delImg(conText, value) {
        // 不适用双遍历是因为如果数据量比较大，会消耗很多性能
        // 这里使用查找替换的方式来进行删除逻辑
        let deletionAfterList = [];
        let index = null;
        deletionAfterList = value.album_list.filter(item => {
            index = value.del_id.indexOf(item.id);
            if (index == "-1") {
                return true;
            }
        })
        conText.imgList[value.album_id] = deletionAfterList;
    }
}; // 简单事件（可以修改数据，第一个参数为当前上下文）

const actions = {
    // 获取异步请求数据，提交给mutations来进行数据调整
    getAlbumList(context) {
        console.log(context);
        let url = context.state.albumUrlConfig.url + context.state.albumUrlConfig.getAlbumList;
        axios.get(url, {
            params: {
                user_id: context.state.userConfig.user_id
            }
        })// 获取到的数据 使用commit提交到mutations进行处理
            .then(response => {
                context.commit("getAlbumList", response.data.data);
            }).catch(error => {
                console.log(error)
            })
    },
    // 添加相册
    addAlbum(context, value) {
        // return;
        let url = context.state.albumUrlConfig.url + context.state.albumUrlConfig.putAlbum;
        axios.post(url, {
            "user_id": context.state.userConfig.user_id,
            "album_name": value.album_name,
            "put_album_cover_img": value.album_cover_img
        }, {
            headers: {
                "Content-type": "multipart/form-data"
            },
        }).then(response => {
            if (response.data.code) {
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    },
    // 编辑相册
    editAlbum(context, value) {
        let url = context.state.albumUrlConfig.url + context.state.albumUrlConfig.editAlbum;
        axios.post(url, {
            "user_id": context.state.userConfig.user_id,
            "album_id": value.album_id,
            "album_name": value.album_name,
            "album_cover_img": value.album_cover_img
        }, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }).then(response => {
            if (response.data.code) {
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    },
    // 删除相册
    delAlbum(context, value) {
        let url = context.state.albumUrlConfig.url + context.state.albumUrlConfig.delAlbum;
        axios.delete(url, {
            params: {
                "user_id": context.state.userConfig.user_id,
                "album_id": value.album_id,
                "force_del" : value.force_del,
            }
        }).then(response => {
            if (response.data.code) {
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
            // 刷新页面重新载入数据
            window.location.reload(true);
        }).catch(error => {
            console.log(error);
        })
    },
    // value参数需要的是相册id，用户id则在自身上下文中找（this），页码的话暂时写死
    getImgList(context, value) {
        let url = context.state.imgUrlConfig.url + context.state.imgUrlConfig.getImgList;
        axios.get(url, {
            params: {
                "album_id": value.album_id,
                "user_id": context.state.userConfig.user_id,
                "page_num": 1
            }
        })
            .then(response => {
                context.commit("getImgList", {
                    album_id: value.album_id,
                    data: response.data.data,
                });
            })
            .catch(error => {
                console.log(error);
            })
    },
    // 添加相册图片
    putImg(context, value) {
        let url = context.state.imgUrlConfig.url + context.state.imgUrlConfig.putImg;

        axios.post(url, {
            "user_id": context.state.userConfig.user_id,
            "album_id": value.album_id,
            "image": value.image
        },{
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
        .then(response => {
            if (response.data.code) {
                alert(response.data.msg);
            } else {
                alert(response.data.msg);
            }
        }).catch(error => {
            console.log(error);
        })
    },
    // 删除选中
    selectDel(context, value) {
        let url = context.state.imgUrlConfig.url + context.state.imgUrlConfig.delImg;
        // 过滤数据，只传输id过去
        let selectList = new Array;
        context.state.imgList[value.album_id].forEach(v => {
            if (v.isSelect) {
                selectList.push(v.id);
            }
        });
        axios.delete(url, {
            params: {
                "user_id": context.state.userConfig.user_id,
                "album_id": value.album_id,
                "img_id_list": selectList,
            }
        }).then(response => {
            // 如果删除成功，则在视图数据中进行删除相应数据
            if (response.data.code) {
                context.commit("delImg", {
                    "album_id": value.album_id,
                    "del_id": response.data.data
                });
            } else {
                console.log(response.data);
            }

        }).catch(error => {
            console.log(error);
        })
    },

}; // 复杂事件（不要修改数据，第一个参数为...）

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})