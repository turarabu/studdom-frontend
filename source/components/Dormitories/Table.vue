<template lang="pug">

    table( class='dormitories-table' )
        thead( class='not-body head' )
            tr( class='row' )
                th( v-for='(th, id) in table.head' class='data' :key='id' ) {{ th.value }}
            
        tbody( class='body' )
            tr( v-for='(row, id) in table.body' class='row' :key='id' )
                td( v-for='(td, id) in row' class='data' ) {{ td.value }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' :colspan='table.head.length - 1' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
export default {
    props: ['table'],
    computed: { all }
}

function all () {
    return this.table.body.length
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

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