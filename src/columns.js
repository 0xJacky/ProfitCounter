const columns = [
    {
        title: '订单号',
        dataIndex: 'order_id',
        scopedSlots: {customRender: 'order_id'},
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        },
        pithy: true,
        sorter: true,
        edit: {
            type: 'input'
        }
    }, {
        title: '名称',
        dataIndex: 'name',
        sorter: true,
        scopedSlots: {customRender: 'name'},
        search: {
            type: 'input',
            labelCol: 6,
            wrapperCol: 16
        },
        pithy: true,
        edit: {
            type: 'input'
        }
    }, {
        title: '单价',
        dataIndex: 'price',
        sorter: true,
        scopedSlots: {customRender: 'price'},
        pithy: true,
        edit: {
            type: 'number'
        }
    }, {
        title: '数量',
        dataIndex: 'amount',
        scopedSlots: {customRender: 'amount'},
        sorter: true,
        pithy: true,
        edit: {
            type: 'number',
            min: 0
        }
    }, {
        title: '总价',
        dataIndex: 'total',
        scopedSlots: {customRender: 'total'},
        edit: {
            type: 'readonly'
        },
        sorter: true,
    }, {
        title: '出售单价',
        dataIndex: 'soldPrice',
        scopedSlots: {customRender: 'soldPrice'},
        edit: {
            type: 'number',
            min: 0
        },
        sorter: true,
    }, {
        title: '出售数量',
        dataIndex: 'soldAmount',
        scopedSlots: {customRender: 'soldAmount'},
        edit: {
            type: 'number',
            min: 0
        },
        sorter: true,
    }, {
        title: '出售总价',
        dataIndex: 'soldTotal',
        scopedSlots: {customRender: 'soldTotal'},
        edit: {
            type: 'readonly'
        }
    }, {
        title: '利润',
        dataIndex: 'profit',
        scopedSlots: {customRender: 'profit'},
        edit: {
            type: 'readonly'
        },
        sorter: true,
    }, {
        title: '全部卖出',
        dataIndex: 'soldOut',
        scopedSlots: {customRender: 'soldOut'},
        badge: true,
        mask: {
            true: '全部卖出',
            false: '有库存'
        },
        search: {
            type: 'checkbox',
            default: true,
            labelCol: 18,
            wrapperCol: 2
        },
        sorter: true
    }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        scopedSlots: {customRender: 'createdAt'},
        datetime: true,
        sorter: true
    }, {
        title: '起始时间',
        dataIndex: 'startDate',
        display: false,
        search: {
            type: 'date_picker'
        }
    },{
        title: '结束时间',
        dataIndex: 'endDate',
        display: false,
        search: {
            type: 'date_picker'
        }
    }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: {customRender: 'action'}
    }
]

export default columns
