<template lang="pug">
    div#home
        div( class='cards-div' )
            InfoCard( class='red' icon='bed' title='Общежитий' value=6 icon-top='8px' )
            InfoCard( class='green' icon='student' title='Студентов' value=1 icon-top='8px' )
            InfoCard( class='blue arrows-rotate' icon='arrows' title='Авторизации' value=1 icon-top='4px' )
            InfoCard( class='purple' icon='reports' title='Отчёты' value=0 icon-top='8px' )

        FirstLine
        SecondLine
</template>

<script>
import InfoCard from ':src/components/Home/InfoCard.vue'
import FirstLine from ':src/components/Home/FirstLine.vue'
import SecondLine from ':src/components/Home/SecondLine.vue'

export default {
    components: { InfoCard, FirstLine, SecondLine }
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
        height 240px
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
                font-size 20px

            .key-subtitle
                color darken($light-gray, 15)
                display block
                font-size 14px

            .value
                font-size 24px
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
            width 200px
            &.title
                font-size 18px
                font-weight 300
                margin-top 14px
                width 220px

            .value
                text-align right
</style>