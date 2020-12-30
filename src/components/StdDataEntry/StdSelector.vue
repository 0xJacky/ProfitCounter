<template>
    <div class="std-selector">
        <a-input v-model="value" disabled/>
        <a-button @click="visible=true">更变</a-button>
        <a-modal
            title="选择器"
            :visible="visible"
            ok-text="选择"
            cancel-text="取消"
            :mask="false"
            @ok="ok()"
            @cancel="visible=false"
        >
            <std-table
                :columns="columns"
                :api="api"
                :data_key="data_key"
                :pagination_method="pagination_method"
                :selectionType="selectionType"
                :pithy="true"
                @selected="onSelect"
                :disable_search="disable_search"
            />
        </a-modal>
    </div>
</template>

<script>
    import StdTable from '../StdDataDisplay/StdTable'

    export default {
        name: 'StdSelector',
        components: {StdTable},
        props: {
            value: [Number, String],
            selectionType: {
                type: String,
                default: 'checkbox',
                validator: function (value) {
                    return ['checkbox', 'radio'].indexOf(value) !== -1
                }
            },
            api: Object,
            columns: Array,
            data_key: String,
            pagination_method: {
                type: String,
                validator: function (value) {
                    return ['a', 'b'].indexOf(value) !== -1
                }
            },
            disable_search: {
                type: Boolean,
                default: true
            }
        },
        model: {
            prop: 'value',
            event: 'changeSelect'
        },
        data() {
            return {
                visible: false,
                selected: []
            }
        },
        methods: {
            onSelect(selected) {
                this.selected = selected
            },
            ok() {
                this.visible = false
                let selected = this.selected
                if (this.selectionType === 'radio') {
                    selected = this.selected[0]
                }
                this.$emit('changeSelect', selected)
            }
        }
    }
</script>

<style lang="less" scoped>
    .std-selector {
        min-width: 300px;

        .ant-input {
            width: auto;
            margin: 0 10px 0 0;
        }
    }
</style>
