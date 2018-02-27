<template lang="pug">
    #index
        .panel
            .btn
                router-link(to="a") 跳转到页面A
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        watch: {},
        props: [],
        computed: {
        },
        created() {
        },
        mounted() {
            this.$store.dispatch('setTitle','当前页面是首页-home')
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
    #index {
        padding-top: 15px;
    }
</style>