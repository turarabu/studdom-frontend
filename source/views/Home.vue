<template lang="pug">
    div#home
        div( class='cards-div' )
            InfoCard( class='red' icon='bed' title='Общежитий' :value='dormitories.length' icon-top='8px' )
            InfoCard( class='green' icon='student' title='Студентов' value=1 icon-top='8px' )
            InfoCard( class='blue arrows-rotate' icon='arrows' title='Авторизации' :value='allSigns' icon-top='4px' )
            InfoCard( class='purple' icon='reports' title='Отчёты' value=0 icon-top='8px' )

        FirstLine( :use='use' )
        SecondLine( :use='use' )
</template>

<script>
import InfoCard from ':src/components/Home/InfoCard.vue'
import FirstLine from ':src/components/Home/FirstLine.vue'
import SecondLine from ':src/components/Home/SecondLine.vue'

export default {
    components: { InfoCard, FirstLine, SecondLine },
    computed: { dormitories, allSigns },
    mounted: start,
    data: function () {
        return {
            use: window.innerWidth >= 1600 ? 1600 : 1366
        }
    }
}

function dormitories () {
    return this.$store.state.dormitories.list
}

function allSigns () {
    var dormitories = JSON.parse( JSON.stringify(this.$store.state.dormitories.list))
    var count = 0

    dormitories.forEach(dormitory => {
        count += dormitory.signs
    })

    return count
}

function start () {
    window.onresize = () => {
        this.use = window.innerWidth >= 1600 ? 1600 : 1366
    }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#home

    .cards-div
        align-items flex-start
        display flex
        justify-content space-between

        .arrows-rotate .icon
            display inline-block
            transform rotate(90deg)

    .diag-size-1
        align-items center
        border 1px solid $light-gray
        border-right none
        display flex
        justify-content center
        height 200px
        width 33.3333%
        &:last-child
            border-right 1px solid $light-gray
        &.texts
            flex-direction column

        .home-data-line
            align-items center
            display flex
            margin 8px 0
            justify-content space-between
            width 80%

            .key-title
                color darken($light-gray, 35)
                font-size 14px

            .key-subtitle
                color darken($light-gray, 15)
                display block
                font-size 14px

            .value
                font-size 14px
                font-weight 500
                &.red
                    color $red
                &.blue
                    color $blue
                &.purple
                    color $purple

        .legend-line
            align-items flex-start
            display flex
            justify-content space-between
            width 120px
            &.title
                font-size 12px
                font-weight 300
                margin-top 14px
                width 140px

            .value
                text-align right

@media (min-width: 1600px)
    .diag-size-1
        align-items center
        border 1px solid $light-gray
        border-right none
        display flex
        justify-content center
        height 240px !important
        width 33.3333% 
        &:last-child
            border-right 1px solid $light-gray
        &.texts
            flex-direction column

        .home-data-line
            align-items center
            display flex
            margin 8px 0
            justify-content space-between
            width 80%

            .key-title
                color darken($light-gray, 35)
                font-size 20px !important

            .key-subtitle
                color darken($light-gray, 15)
                display block
                font-size 14px !important

            .value
                font-size 24px !important
                font-weight 500
                &.red
                    color $red
                &.blue
                    color $blue
                &.purple
                    color $purple

        .legend-line
            align-items flex-start
            display flex
            justify-content space-between
            width 200px !important
            &.title
                font-size 18px !important
                font-weight 300
                margin-top 14px !important
                width 220px !important

            .value
                text-align right

</style>