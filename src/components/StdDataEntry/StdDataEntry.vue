<template>
    <a-form class="std-data-entry" :layout="layout">
        <a-form-item
            :label="d.title" v-for="d in dataList" :key="d.dataIndex"
            :validate-status="error[d.dataIndex] ? 'error' :'success'"
            :help="error[d.dataIndex] ? error[d.dataIndex].toString() : null"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
        >
            <a-input v-if="d.edit.type==='input'" v-model="dataSource[d.dataIndex]" :placeholder="d.edit.placeholder"/>
            <a-textarea v-else-if="d.edit.type==='textarea'" v-model="dataSource[d.dataIndex]"/>
            <std-select-option v-else-if="d.edit.type==='select'" v-model="temp[d.dataIndex]" :options="d.mask"/>
            <std-selector
                :api="d.edit.api" :columns="d.edit.columns" v-model="temp[d.dataIndex]"
                :data_key="d.edit.data_key" :pagination_method="d.edit.pagination_method"
                selection-type="radio" :disable_search="d.edit.disable_search"
                v-else-if="d.edit.type==='selector'"
            />
            <a-input-number :min="d.edit.min" :step="d.edit.step"
                            v-model="temp[d.dataIndex]" v-else-if="d.edit.type==='number'"/>

            <std-date-picker v-else-if="d.edit.type==='date_picker'" v-model="temp[d.dataIndex]"/>

            <a-slider
                v-else-if="d.edit.type==='slider'"
                :min="d.edit.min"
                :max="d.edit.max"
                :marks="d.mask"
                v-model="temp[d.dataIndex]"
            />

            <std-transfer
                v-else-if="d.edit.type==='transfer'"
                :api="d.edit.api"
                :data-key="d.edit.dataKey"
                v-model="temp[d.dataIndex]"
            />

            <template v-else-if="d.edit.type==='readonly'">{{ temp[d.dataIndex] }}</template>

        </a-form-item>
        <a-form-item>
            <slot name="action"/>
        </a-form-item>
    </a-form>
</template>

<script>
    import StdSelectOption from './StdSelectOption'
    import StdSelector from './StdSelector'
    import StdDatePicker from './StdDatePicker'
    import StdTransfer from './StdTransfer'

    export default {
        name: 'StdDataEntry',
        components: {
            StdTransfer,
            StdDatePicker,
            StdSelectOption,
            StdSelector
        },
        props: {
            dataList: Array,
            dataSource: Object,
            error: {
                type: Object,
                default() {
                    return {}
                }
            },
            layout: {
                default: 'vertical',
                validator: value => {
                    return ['horizontal', 'vertical', 'inline'].indexOf(value) !== -1
                }
            }
        },
        model: {
            prop: 'dataSource',
            event: 'changeDataSource'
        },
        data() {
            return {
                temp: null,
                i: 0,
                labelCol: {},
                wrapperCol: {}
            }
        },
        watch: {
            dataSource() {
                this.temp = this.dataSource
            }
        },
        created() {
            this.temp = this.dataSource
            if (this.layout === 'horizontal') {
                this.labelCol = {span: 4}
                this.wrapperCol = {span: 18}
            }
        }
    }
</script>

<style scoped>

</style>
