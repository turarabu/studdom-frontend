<template lang="pug">
    div#home
        div( class='cards-div' )
            InfoCard( class='red' icon='bed' title='Общежитий' value=24 icon-top='8px' )
            InfoCard( class='green' icon='student' title='Студентов' value=2451 icon-top='8px' )
            InfoCard( class='blue arrows-rotate' icon='arrows' title='Авторизации' value=485654 icon-top='4px' )
            InfoCard( class='purple' icon='reports' title='Отчёты' value=122 icon-top='8px' )

        div( class='br' )
</template>

<script>
import InfoCard from ':src/components/Home/InfoCard.vue'

export default {
  components: { InfoCard }
}
</script>

<style lang='stylus'>
#home

    .cards-div
        align-items flex-start
        display flex
        justify-content space-between

        .arrows-rotate .icon
            display inline-block
            transform rotate(90deg)
</style>