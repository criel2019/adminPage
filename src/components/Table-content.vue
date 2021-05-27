<template>
  <div class="table-content">
    <table>
      <tr
        class="table-row"
        v-for="exhibition in exhibitions"
        :key="exhibition.id"
      >
        <th width="200">{{ exhibition.id }}</th>
        <th width="500">{{ exhibition.title }}</th>
        <th width="300">{{ exhibition.start }}</th>
        <th width="300">{{ exhibition.end }}</th>
        <th width="200">{{ exhibition.show }}</th>
        <th width="200">{{ exhibition.rank }}</th>
        <th width="200">{{ exhibition.quantity }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    exhibitions: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      id: null,
      title: null,
      start: null,
      end: null,
      show: null,
      rank: null,
      quantity: null
    }
  },
  methods: {
    onSubmit() {
      // let ExhibitionInfo = {
      //   id: this.id,
      //   title: this.title,
      //   start: this.start,
      //   show: this.show,
      //   end: this.end,
      //   rank: this.rank,
      //   quantity: this.quantity
      // }
      // this.$emit('exhibition-submitted', ExhibitionInfo)
      this.id = null
      this.title = null
      this.start = null
      this.end = null
      this.show = null
      this.rank = null
      this.quantity = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 1900px;
}
.table-content {
  margin: 50px 0 0 0;
  width: 1900px;
  font-size: 23px;
}
.table-row {
  background-color: #eeeeee;
  height: 80px;
}
</style>
