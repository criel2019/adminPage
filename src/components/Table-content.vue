<template>
  <div class="table-content">
    <table>
    <tr class="table-row" v-for="(exhibition,index) in exhibitions" :key="index">
        <th width="200"> {{exhibitions[index].id}} </th>
        <th width="500"> {{exhibitions[index].title}} </th>
        <th width="300"> {{exhibitions[index].start}} </th>
        <th width="300"> {{exhibitions[index].end}} </th>
        <th width="200"> {{exhibitions[index].show}} </th>
        <th width="200"> {{exhibitions[index].priority}} </th>
        <th width="200"> {{exhibitions[index].quantity}} </th>
      </tr>
</table>
    </div>
</template>

<script>
export default {
  props: {
        exhibitions:{
           type: Array,
           required: true
       }
    },
  data() {
        return {
            id: null,
            title: null,
            start: null,
            end:null,
            show: null,
            priority: null,
            quantity: null
        }
    },
    methods: {
        onSubmit() {
            let ExhibitionInfo = {
                id: this.id,
                title: this.title,
                start: this.start,
                show: this.show,
                end: this.end,
                priority: this.priority,
                quantity: this.quantity,
            }
            this.$emit('exhibition-submitted', ExhibitionInfo)
            this.id = null
            this.title = null
            this.start = null
            this.end = null
            this.show = null
            this.priority = null
            this.quantity = null
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table{ 
    width: 1900px;
}
.table-content{
    margin: 50px 0 0 0;
    width: 1900px;
    font-size: 23px;
}
.table-row{
    background-color: #EEEEEE;
    height: 80px;
}
</style>
