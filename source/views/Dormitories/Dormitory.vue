<template lang='pug'>
    div( class='concrette-dormitory' )
        div( class='tabs-div' )
            span( class='tab' :class='{ active: active === 0 }' @click='active = 0' ) Регистрации
            span( class='tab' :class='{ active: active === 1 }' @click='active = 1' ) Авторизации
            span( class='tab' :class='{ active: active === 2 }' @click='active = 2' ) Активность турникетов

        StudentsTable( v-if='active === 0' v-bind='{ dormitory }' )
        SignsTable( v-if='active === 1' v-bind='{ dormitory }' )
        TurnstilesTable( v-if='active === 2' v-bind='{ dormitory }' )
</template>

<script>
import StudentsTable from ':src/components/Dormitories/Tables/Students.vue'
import SignsTable from ':src/components/Dormitories/Tables/Signs.vue'
import TurnstilesTable from ':src/components/Dormitories/Tables/Turnstile.vue'

export default {
    components: { StudentsTable, SignsTable, TurnstilesTable },
    computed: { dormitory },
    mounted: start,
    data: function () {
        return {
            active: 0
        }
    }
}

function dormitory () {
    for ( let dormitory of this.$store.state.dormitories.list ) {
        if ( dormitory.code === this.$route.params.id )
            return dormitory
    }
}

async function start () {
    var id = this.$route.params.id
    var dormitory = this.dormitory

    if ( dormitory.detailsLoaded === undefined ) {
        var { data } = await this.api.get('dormitory/details', { dormitory: dormitory.code })

        data.id = id
        data.detailsLoaded = true

        this.$store.commit('students-add', data.students)
        this.$store.commit('dormitories-update', data)
    }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.concrette-dormitory

    .tabs-div
        border-bottom 1px solid $light-gray
        display flex
        margin 24px 0

        .tab
            border 1px solid transparent
            border-radius 5px 5px 0 0
            color $blue
            cursor pointer
            display block
            font-size 18px
            font-weight 300
            margin-bottom -1px
            padding 12px 72px
            text-transform uppercase
            &.active
                border 1px solid $light-gray
                border-bottom 1px solid $white

    .dormitories-table
        border-collapse collapse
        margin 42px 0
        width 100%

        .not-body
            &.head
                border-bottom 1px solid $light-gray
            &.foot
                border-top 1px solid $light-gray

                .data
                    padding-top 4px

            .data
                font-weight 500
                padding 8px 12px

        .body
            &:before, &:after
                content ''
                display block
                height 8px

            .data:last-child
                font-weight 500

            .row
                cursor pointer
                &:hover
                    background lighten($light-gray, 25)

        .data
            font-size 24px   
            padding 4px 12px
            text-align left
            &:last-child
                text-align right
</style>