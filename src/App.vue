<template>
    <div id="app">
        <a-config-provider :locale="zh_CN">
            <a-row
                class="container center"
                :align="'middle'"
                :type="'flex'"
            >
                <a-col :xs="1"/>
                <a-col
                    :xs="22"
                >
                    <std-curd
                        :api="api"
                        :columns="columns"
                        @clickQuery="getStatistic"
                        @stored="getStatistic"
                    />
                    <p style="padding: 20px 0">查询到{{ stat.count }}条数据, 成本为{{ stat.total }}元, 收入为{{ stat.soldTotal }}元, 利润为{{ stat.profit }}元</p>
                    <div>
                        <p style="text-align: center">Copyright © 余圳曦 2020-{{ thisYear }}</p>
                    </div>
                </a-col>
                <a-col :xs="1"/>
            </a-row>
        </a-config-provider>
    </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import StdCurd from "@/components/StdDataDisplay/StdCurd"
import {api} from "@/api"
import columns from './columns'


export default {
    name: 'App',
    components: {
        StdCurd
    },
    data() {
        return {
            stat: {
                count: 0,
                total: 0,
                soldTotal: 0,
                profit: 0,
            },
            thisYear: new Date().getFullYear(),
            columns,
            api,
            zh_CN
        }
    },
    mounted() {
        this.getStatistic()
    },
    methods: {
        async getStatistic(params = {}) {
            this.stat = await api.getStatistics(params)
        }
    }
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;

    .container {
        position: fixed;
        height: 100%;
        width: 100%;
    }
}

</style>
