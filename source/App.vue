<template lang="pug">
    body#app
        AuthPage( v-if='user.status === false' )
        Dashboard( v-else )

        div#modals-div( v-if='modals.length > 0' @click='checkClose' )
            div( v-for='(modal, id) in modals' :key='id' )
                ModalCreateUser( v-if='modal.name == "createUser"' v-bind='{ id, data: modal.data }' )
                ModalScreenUser( v-if='modal.name == "screenUser"' v-bind='{ id, data: modal.data }' )
                ModalCreateDormitory( v-if='modal.name == "createDormitory"' v-bind='{ id, data: modal.data }' )
                ModalCreateTurnstile( v-if='modal.name == "createTurnstile"' v-bind='{ id, data: modal.data }' )
                ModalEditDormitory( v-if='modal.name == "editDormitory"' v-bind='{ id, data: modal.data }' )
                ModalEditUser( v-if='modal.name == "editUser"' v-bind='{ id, data: modal.data }' )


</template>

<script>
import AuthPage from ':src/components/Auth.vue'
import Dashboard from ':src/components/Dashboard.vue'

import ModalCreateUser from ':src/components/Modal/CreateUser.vue'
import ModalCreateDormitory from ':src/components/Modal/CreateDormitory.vue'
import ModalCreateTurnstile from ':src/components/Modal/CreateTurnstile.vue'
import ModalScreenUser from ':src/components/Modal/ScreenModal.vue'
import ModalEditDormitory from ':src/components/Modal/EditDormitory.vue'
import ModalEditUser from ':src/components/Modal/EditUser.vue'

export default {
    components: { AuthPage, Dashboard, ModalCreateUser,ModalCreateTurnstile, ModalCreateDormitory,ModalScreenUser, ModalEditDormitory, ModalEditUser },
    computed: { user, modals },
    methods: { loadData, checkClose },
    mounted: start
}

function user () {
    console.log('123')
    console.log(this.$store.state.user)
    return this.$store.state.user
}

function modals () {
    return this.$store.state.modals
}

async function loadData () {
    if ('cities') {
        let { data } = await this.api.get('city/list')
        this.$store.commit('cities-set', data)
    }

    if ('dormitories') {
        let { data } = await this.api.get('dormitory/list')
        this.$store.commit('dormitories-set', data)
    }

    return true
}

function checkClose (event) {
    if ( event.target.id === 'modals-div' )
        this.$store.commit('closeModal', this.modals.length - 1)
}

async function start () {
    if ('user') {
        let { data } = await this.api.get('user/profile')

        if ( data.login ) {
            await this.loadData()
            this.$store.commit('user-set', data)
            this.$router.push('/')
        }

        else this.$store.commit('user-quit')
    }

    if ('actions') {
        let { data } = await this.api.get('action/list')

        this.$store.commit('set-actions', data)
    }
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

    .modal
        background $white
        border-radius 5px
        box-shadow 0 0 15px RGBA(50, 50, 50, .5)

        .modal-title
            font-size 20px
            font-weight 500
</style>