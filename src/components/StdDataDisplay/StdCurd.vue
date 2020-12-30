<template>
    <div>
        <a-card title="列表">
            <a slot="extra" @click="add" v-if="!disable_add">添加</a>
            <std-table
                :columns="columns"
                :api="api"
                :disable_search="disable_search"
                :pagination_method="pagination_method"
                :data_key="data_key"
                ref="table"
                @clickQuery="params => {$emit('clickQuery', params)}"
                @clickEdit="edit"
                :soft_delete="soft_delete"
            />
        </a-card>
        <a-modal
            :title="data._id && data.name ? '编辑产品: ' + data.name : '添加'"
            :visible="visible"
            ok-text="保存"
            cancel-text="取消"
            :mask="false"
            @ok="ok"
            @cancel="visible=false;error={}"
        >
            <std-data-entry :data-list="editableColumns(columns)" :data-source="data" layout="horizontal" :error="error" ref="std_data_entry"/>
        </a-modal>
    </div>
</template>

<script>
    import StdTable from './StdTable'
    import StdDataEntry from '../StdDataEntry/StdDataEntry'

    export default {
        name: 'StdCurd',
        components: {
            StdTable,
            StdDataEntry
        },
        props: {
            api: Object,
            columns: Array,
            data_key: {
                type: String,
                default: 'data'
            },
            pagination_method: {
                default: 'b',
                validator: function (value) {
                    return ['a', 'b', 'none'].indexOf(value) !== -1
                }
            },
            disable_search: {
                type: Boolean,
                default: false
            },
            disable_add: {
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
                visible: false,
                data: {
                    _id: null,
                },
                error: {}
            }
        },
        methods: {
            editableColumns(columns) {
                return columns.filter((c) => {
                    return c.edit
                })
            },
            uploadColumns(columns) {
                return columns.filter((c) => {
                    return c.edit && c.edit.type === 'upload'
                })
            },
            add() {
                this.visible = true
                this.data = {
                    _id: null
                }
            },
            ok() {
                this.api.save((this.data._id ? this.data._id : null), this.data).then(r => {
                    this.$message.success('保存成功')
                    this.data = r
                    this.$refs.table.get_list()
                    this.$emit('stored', this.params)
                }).catch(error => {
                    console.log(error)
                    this.$message.error('保存失败')
                    this.error = error.errors
                })
            },
            edit(id) {
                this.api.get(id).then(r => {
                    this.data = r
                    this.visible = true
                }).catch(() => {
                    this.$message.error('错误')
                })
            }
        }
    }
</script>

<style scoped>

</style>
