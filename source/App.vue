<template lang="pug">
    body#app
        AuthPage( v-if='user.status === false' )
        Dashboard( v-else )
</template>

<script>
import AuthPage from ':src/components/Auth.vue'
import Dashboard from ':src/components/Dashboard.vue'

export default {
    beforeCreate: init,
    components: { AuthPage, Dashboard },
    computed: { user },
    mounted: start
}

function init () {
    // this.setLangVuex(this.$store)
}

function user () {
    return this.$store.state.user
}

function start () {
    this.$watch('$route', route => {
        console.log(route)
    })
}
</script>

<style lang="stylus">
@import '~src/style/fonts'
@import '~src/style/base'
@import '~src/style/palette'
</style>