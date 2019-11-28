<template lang="pug">
    div#home
        h1 Home page
        InfoCard( icon='circle' title='Круг' value=10 )
</template>

<script>
import InfoCard from ':src/components/Home/InfoCard.vue'

export default {
  components: { InfoCard }
}
</script>
