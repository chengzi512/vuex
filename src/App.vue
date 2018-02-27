<template lang="pug">
    #App
        .title {{title}}
        .num 点击次数: {{num}} 次, 数字 {{ $store.state.count }} 是 {{ evenOrOdd }}.
        .panel
            .btn(@click="increment") +
            .btn(@click="decrement") -
            .btn(@click="incrementIfOdd") 如果是基数的话加1
            .btn(@click="incrementAsync") 异步增加
        router-view
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data() {
            return {
                msg:'123'
            }
        },
        watch: {},
        props: [],
        computed:{
            ...mapGetters([
                'evenOrOdd'
            ]),
            title(){
                return this.$store.state.title
            },
            num(){
                return this.$store.state.num
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            ...mapActions([
                'increment',
                'decrement',
                'incrementIfOdd',
                'incrementAsync'
            ])
        }
    }
</script>
<style lang="less" scoped>
    #App {
    }
</style>