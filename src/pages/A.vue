<template lang="pug">
    #A
        .panel
            .btn(@click="TO") 跳转到页面B
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
            this.$store.dispatch('setTitle','页面A')
        },
        methods: {
            TO(){
                this.$router.push('/b')
            }
        }
    }
</script>
<style lang="less" scoped>
    #A {
        padding-top: 15px;
    }
</style>