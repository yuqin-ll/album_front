<template>
    <el-row :gutter="10" class="navigation">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple navigation_item">
                <div class="dropdown-btn">
                    <div class="menu-icon" @click="ondropdown">
                        <div class="bread" :class="{'bread1': drawer}"></div>
                        <div class="bread" :class="{'bread2': drawer}"></div>
                        <div class="bread" :class="{'bread3': drawer}"></div>
                    </div>
                </div>

                <el-drawer
                    title
                    :visible.sync="drawer"
                    :direction="direction"
                    :before-close="handleClose"
                    class="dropdown-top"
                    
                >
                    <div class="dropdown-main" @click.native="ondropdown">
                        <ul >
                            <li>
                                <router-link to="/">首页</router-link>
                            </li>
                            <li>
                                <router-link to="/admin">管理</router-link>
                            </li>
                        </ul>
                    </div>
                </el-drawer>
            </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple-light navigation_item"></div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="grid-content bg-purple-light navigation_item"></div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'navigation',
    data() {
        return {
            activeIndex2: '1',
            drawer: false,  // 显示隐藏
            direction: 'ttb',   // 下拉菜单方向
        };
    },
    methods: {
        ondropdown() {
            this.drawer = !this.drawer;
        },
        handleClose(done) {
            done();
        }
    },
};
</script>

<style  scoped>
.navigation {
    background: #7b8da1;
}
.navigation_item {
    height: 30px;
    line-height: 30px;
    padding: 5px;
}

/* 下拉按钮 */
.dropdown-btn {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
}
.menu-icon {
    cursor: pointer;
    position: relative;
    width: 54px;
    height: 40px;
}
.bread {
    width: 24px;
    height: 2px;
    border-radius: 2px;
    background: #50585f;
    margin: 5px 0;
    transition: 0.5s;
}
.bread1 {
    margin-top: 13px;
    transform: rotate(45deg);
    transition: 0.5s;
}
.bread2 {
    margin-top: -6px;
    transform: rotate(135deg);
    transition: 0.5s;
}
.bread3 {
    display: none;
}
/* 下拉菜单 */
.dropdown-top {
    margin: 0;
}
.dropdown-main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.dropdown-main li {
    list-style-type: none;
    width: 90%;
    border-bottom: 1px solid #dddddd;
}
.dropdown-main li a {
    display: inline-block;
    width: 100%;
    padding: 10px 5px;
    color: #343434;
    text-decoration: none;
}
</style>

<style>
.navigation .el-drawer__header {
    margin: 0 !important;
}
.navigation .el-drawer {
    height: 100% !important;
    padding-bottom: 10px !important;
}
.navigation .el-drawer {
    background-color: rgba(255, 255, 255, 0.9);
}
</style>