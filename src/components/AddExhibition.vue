<template>
  <div class="addExhibition">
    <form class="review-form" @submit.prevent="onSubmit">

    <v-text-field
    
    v-model="title" 
      label="Title"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>


<v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="startPicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="start"
            label="기획전 시작날짜 선택"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          @input="startPicker = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>


  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        v-model="endPicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="end"
            label="기획전 종료날짜 선택"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="end"
          @input="endPicker = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>


 <v-container fluid>
    <v-checkbox v-model="show">
      <template v-slot:label>
        <div>
          show this Exhibition
        </div>
      </template>
    </v-checkbox>
  </v-container>

    

  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
        id="priority"
        v-model.number="priority"
          :items="items"
          label="priority"
        ></v-select>
        </v-col>
    </v-row>
  </v-container>

        <v-text-field
         id="quantity"
    v-model="quantity" 
      label="quantity"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>

    <p>
      <v-btn type="submit" id="submit" value="Submit">저장</v-btn>  
    </p>    
  
  </form>
    </div>
</template>

<script>

export default {
  data() {
        return {
            id: null,
            title: null,
            start: null,
            end: null,
            show: null,
            priority: null,
            quantity: null,
            endPicker: null,
            startPicker: null,
             rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || '최소 1글자 이상 적어주세요',
      ],
      items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        
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
<style>
</style>

