<template>
    <div class="std-table">
        <a-form layout="inline" v-if="!disable_search">
            <a-form-item
                :key="c.dataIndex" v-for="c in searchColumns(columns)"
                :label="c.title"
            >
                <a-input v-model="params[c.dataIndex]" v-if="c.search.type==='input'"/>
                <a-checkbox
                    v-if="c.search.type==='checkbox'"
                    :default-checked="c.search.default"
                    :name="c.search.condition?c.search.condition:c.dataIndex"
                    @change="checked"/>
                <a-slider
                    v-else-if="c.search.type==='slider'"
                    :min="c.search.min"
                    :max="c.search.max"
                    :marks="c.search.mask ? c.search.mask : c.mask"
                    :defaultValue="c.search.defaultValue"
                    v-model="params[c.dataIndex]"
                    style="width: 130px"
                />
                <a-select style="width: 130px" v-model="params[c.dataIndex]"
                          v-if="c.search.type==='select'">
                    <a-select-option v-for="(v,k) in c.mask" :value="k" :key="k">{{ v }}</a-select-option>
                </a-select>
                <std-date-picker v-else-if="c.search.type==='date_picker'" v-model="params[c.dataIndex]"/>
            </a-form-item>
            <a-form-item :wrapper-col="{span:8}">
                <a-button type="primary" @click="get_list(); $emit('clickQuery', params)">查询</a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{span:8}" v-if="!pithy">
                <a-button type="primary" @click="exportExcel" ghost>导出</a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{span:8}">
                <a-button @click="reload">重置</a-button>
            </a-form-item>
        </a-form>
        <div style="text-align: right" v-if="soft_delete">
            <a href="javascript:;" @click="params['trashed']=false; get_list()"
               v-if="params['trashed']">返回</a>
            <a href="javascript:;" @click="params['trashed']=true; get_list()" v-else>回收站</a>
        </div>
        <a-table
            :columns="pithyColumns(columns)"
            :data-source="data_source"
            :row-key="'_id'"
            :pagination="false"
            :rowSelection="{
       selectedRowKeys: selectedRowKeys,
       onChange: onSelectChange,
       type: selectionType,
       }"
            @change="stdChange"
            :loading="loading"
            :customRow="row"
        >
            <template
                :slot="c.scopedSlots.customRender"
                slot-scope="text, record"
                v-for="c in pithyColumns(columns)">
      <span v-if="c.badge" :key="c.dataIndex">
        <a-badge v-if="text === true || text > 0" status="success"/>
        <a-badge status="error" v-else/>
        {{ c.mask ? c.mask[text] : text }}
      </span>
                <span v-else-if="c.datetime" :key="c.dataIndex">

        {{ moment(text).format("yyyy-MM-DD HH:mm:ss") }}
      </span>
                <span v-else-if="c.click" :key="c.dataIndex">
          <a href="javascript:;" @click="handleClick(record[c.click.index?c.click.index:c.dataIndex],
          c.click.index?c.click.index:c.dataIndex,
          c.click.method, c.click.path)">
            {{ text != null ? text : c.default }}
          </a>
        </span>
                <span v-else :key="c.dataIndex">
        {{ text != null ? (c.mask ? c.mask[text] : text) : c.default }}
      </span>
            </template>
            <span slot="action" slot-scope="text, record" v-if="!pithy">
        <a href="javascript:;" @click="$emit('clickEdit', record._id)">编辑</a>
        <a-divider type="vertical"/>
          <a-popconfirm
              v-if="soft_delete&&params.trashed"
              title="你确定要反删除?"
              @confirm="restore(record._id)" okText="是的"
              cancelText="再想想">
            <a href="javascript:;">反删除</a>
          </a-popconfirm>
          <a-popconfirm
              v-else
              title="你确定要删除?"
              @confirm="destroy(record._id)" okText="是的"
              cancelText="再想想"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
      </span>
        </a-table>

    </div>
</template>

<script>
import StdDatePicker from '../StdDataEntry/StdDatePicker'
import moment from "moment"

const {remote} = require('electron')
const xlsx = require('node-xlsx')
const fs = require('fs')

export default {
    name: 'StdTable',
    components: {
        StdDatePicker
    },
    props: {
        columns: Array,
        api: Object,
        data_key: String,
        pagination_method: {
            validator: function (value) {
                return ['a', 'b', 'none'].indexOf(value) !== -1
            }
        },
        selectionType: {
            type: String,
            default: 'checkbox',
            validator: function (value) {
                return ['checkbox', 'radio'].indexOf(value) !== -1
            }
        },
        pithy: {
            type: Boolean,
            default: false
        },
        disable_search: {
            type: Boolean,
            default: false
        },
        soft_delete: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            data_source: [],
            loading: true,
            pagination: {
                total: 1,
                per_page: 10,
                current_page: 1,
                total_pages: 1
            },
            params: {},
            selectedRowKeys: [],
            moment
        }
    },
    mounted() {
        this.get_list()
    },
    methods: {
        get_list() {
            this.loading = true
            this.api.get_list(this.params).then(docx => {
                this.data_source = docx
                this.loading = false
            })
        },
        stdChange(pagination, filters, sorter) {
            if (sorter) {
                this.params['order_by'] = sorter.field
                this.params['sort'] = sorter.order === 'ascend' ? 'asc' : 'desc'
                this.$nextTick(() => {
                    this.get_list()
                })
            }
        },
        destroy(id) {
            this.api.destroy(id).then(() => {
                this.get_list()
                this.$message.success('删除 ID: ' + id + ' 成功')
            }).catch(() => {
                this.$message.error('错误')
            })
        },
        restore(id) {
            this.api.restore(id).then(() => {
                this.get_list()
                this.$message.success('反删除 ID: ' + id + ' 成功')
            }).catch(() => {
                this.$message.error('服务器错误')
            })
        },
        searchColumns(columns) {
            return columns.filter((column) => {
                return column.search
            })
        },
        pithyColumns(columns) {
            if (this.pithy) {
                return columns.filter((c) => {
                    return c.pithy === true && c.display !== false
                })
            }
            return columns.filter((c) => {
                return c.display !== false
            })
        },
        checked(c) {
            this.params[c.target.name] = c.target.checked
        },
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys
            this.$emit('selected', selectedRowKeys)
        },
        handleClick(data, index, method = null, path = null) {
            if (method === 'router') {
                this.$router.push(path + '/' + data).then()
            } else {
                this.params[index] = data
                this.get_list()
            }
        },
        row(record) {
            return {
                on: {
                    click: () => {
                        this.$emit('clickRow', record._id)
                    }
                }
            }
        },
        async reload() {
            this.params = {}
            remote.getCurrentWindow().reload()
        },
        async exportExcel() {
            const result = await remote.dialog.showOpenDialog({
                properties: ['openDirectory']
            })
            if (!result.canceled) {
                console.log(result)
                const dirpath = result.filePaths[0]
                console.log(dirpath)
                const showColumns = this.pithyColumns(this.columns)
                console.log(showColumns)
                let header = []
                for (let showColumnsKey in showColumns) {
                    await header.push(showColumns[showColumnsKey].title)
                }
                // delete 'action'
                header.pop()
                console.log(header)
                const datetime = moment().format("yyyyMMDDHHmmss")
                const buffer = xlsx.build([{
                    name: "Sheet1",
                    data: this.data_source.reduce(this.exportReducer, [header])
                }])
                const filename = dirpath + '/' + datetime + '导出统计.xlsx'
                await fs.writeFileSync(filename, buffer, 'binary')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.ant-form {
    margin: 10px 0 20px 0;
}

.ant-slider {
    min-width: 90px;
}

.std-table {
    .ant-table-wrapper {
        overflow: scroll;
    }
}
</style>
