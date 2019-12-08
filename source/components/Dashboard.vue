<template lang="pug">
    div#dashboard
        Sidebar( class='left' )

        div( class='right' )
            TopBlock
            div#page-container
                div#page
                    router-view 
</template>

<script>
import Sidebar from ':src/components/Sidebar.vue'
import TopBlock from ':src/components/TopBlock.vue'

export default {
    components: { Sidebar, TopBlock }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#dashboard
    overflow hidden
    position absolute
    bottom 0
    top 0
    left 0
    right 0
    z-index 1

    .right
        display flex
        position absolute
        bottom 0
        top 0
        left 260px
        right 0

#page-container
    align-items flex-start
    display flex
    justify-content center
    overflow auto
    padding 32px 0
    position absolute
    top 72px
    left 0
    right 0
    bottom 0
    z-index 1

#page
    width 1040px

    
@media (min-width 1600px)
    #page
        width 1340px

</style>