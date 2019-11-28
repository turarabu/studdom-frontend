<template lang="pug">
    div( class='home-info-card' )
        div( class='icon-div' )
            i( class='icon' :class='icon' )

        div( class='card-info' )
            span( class='title' ) Заголовок: {{ title }}
            span( class='value' ) {{ value }}

</template>

<script>
export default {
    props: ['icon', 'title', 'value']
}
</script>

<style lang='stylus'>
.home-info-card
    border 1px solid #EEE
    border-radius 4px
    display flex
    justify-content space-between
    padding 16px
    width 200px

    .card-info
        width 150px

    .title
        display block
        font-size 20px

    .value
        display block
        font-size 32px

</style>