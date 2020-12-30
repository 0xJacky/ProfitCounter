<template>
    <div v-if="Object.keys(pagination).length !== 0">
        <a-pagination
            :hideOnSinglePage="true"
            :total="pagination.total"
            :current="pagination.current_page"
            class="pagination"
            @change="changePage"
            :pageSize="pagination.per_page"
            :size="size"
        />
        <div class="clear"></div>
    </div>
</template>

<script>
    export default {
        name: 'StdPagination',
        props: {
            pagination: Object,
            size: {
                default: ''
            }
        },
        methods: {
            changePage(num) {
                return this.$emit('changePage', num)
            }
        }
    }
</script>

<style scoped>
    .pagination {
        padding: 10px 0 0 0;
        float: right;
    }
</style>
