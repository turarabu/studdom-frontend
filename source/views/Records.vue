<template lang="pug">
    div#records
        div( class='tabs-div' )
            span( class='tab' :class='{ active: active === 0 }' @click='active = 0' ) Новый отчёт
            span( class='tab' :class='{ active: active === 1 }' @click='active = 1' ) История отчётов

        CreateReport( v-if='active === 0' )
        DownloadReport( v-if='active === 1' )
</template>

<script>
import CreateReport from ':src/components/Reports/CreateReport.vue'
import DownloadReport from ':src/components/Reports/DownloadReport.vue'

export default {
    components: { CreateReport, DownloadReport },
    data: function () {
        return {
            active: 0
        }
    }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#records

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
                color darken($light-gray, 25)


</style>