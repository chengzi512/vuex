<template lang="pug">
    #B
        .panel
            .btn(@click="TO") 跳转到首页
</template>
<script>
    export default {
        data() {
            return {}
        },
        watch: {},
        props: [],
        computed: {},
        created() {
        },
        mounted() {
            this.$store.dispatch('setTitle','B')
        },
        methods: {
            TO(){
                this.$router.push('/')
            }
        }
    }
</script>
<style lang="less" scoped>
    #B {
        padding-top: 15px;
    }
</style>