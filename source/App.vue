<template lang="pug">
    body#app
        AuthPage( v-if='user.status === false' )
        Dashboard( v-else )

        div( id='modals-div' v-if='modals.length > 0' @click='checkClose' )
            div( v-for='(modal, id) in modals' :key='id' )
                ModalCreateUser( v-if='modal.name == "createUser"' v-bind='{ id, data: modal.data }' )
                ModalCreateDormitory( v-if='modal.name == "createDormitory"' v-bind='{ id, data: modal.data }' )


</template>

<script>
import AuthPage from ':src/components/Auth.vue'
import Dashboard from ':src/components/Dashboard.vue'

import ModalCreateUser from ':src/components/Modal/CreateUser.vue'
import ModalCreateDormitory from ':src/components/Modal/CreateDormitory.vue'

export default {
    components: { AuthPage, Dashboard, ModalCreateUser, ModalCreateDormitory },
    computed: { user, modals },
    methods: { checkClose },
    mounted: start
}

function user () {
    return this.$store.state.user
}

function modals () {
    return this.$store.state.modals
}

function checkClose (event) {
    if ( event.target.id === 'modals-div' )
        this.$store.commit('closeModal', this.modals.length - 1)
}

async function start () {
    return
    var { status, data } = await this.api.get('user/profile')

    if ( data.login )
        this.$store.commit('user-set', data)
    
    else this.$store.commit('user-quit')
}
</script>

<style lang="stylus">
@import '~src/style/fonts'
@import '~src/style/base'
@import '~src/style/palette'

#modals-div
    align-items flex-start
    background RGBA(50, 50, 50, .5)
    display flex
    justify-content center
    overflow auto
    padding 62px 0 32px 0
    position fixed
    top 0
    bottom 0
    left 0
    width 100%
    z-index 100
</style>