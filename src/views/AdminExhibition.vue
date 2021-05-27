<template>
  <div class="AdminExhibition">
    <Admin />
  </div>
</template>

<script>
import Admin from '../components/Admin.vue'
export default {
  name: 'Exhibition',
  components: {
    Admin
  },
  data() {
    return {
      example: 'shit'
    }
  }
}
</script>
<style></style>
