<template>
  <div class="addExhibition">
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="title"
        label="Title"
        :rules="rules"
        hide-details="auto"
        style="width:385px;"
      ></v-text-field>
    </v-col>

    <v-row>
      <v-col cols="12" sm="6" md="6">
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

      <v-col style="margin-left: 0px;">
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
    </v-row>
    <v-row justify="space-around">
      <v-col pa-0 mx-4 mt-4 mt-sm-0>
        <v-time-picker
          v-model="timeStart"
          :allowed-minutes="allowedStep"
          class="mt-4 "
          format="24hr"
          color="red lighten-3"
          :landscape="$vuetify.breakpoint.mdAndUp"
          header-color="blue lighten-3"
        ></v-time-picker>
      </v-col>
      <v-col pa-0 mx-4 mt-4 mt-sm-0>
        <v-time-picker
          v-model="timeEnd"
          :allowed-minutes="allowedStep"
          class="mt-4"
          format="24hr"
          color="deep-orange lighten-3"
          header-color="cyan lighten-3"
          :landscape="$vuetify.breakpoint.mdAndUp"
        ></v-time-picker>
      </v-col>
    </v-row>

    <v-container class="px-0" fluid>
      <v-radio-group v-model="radioGroup" row
        >공개여부:

        <v-radio
          style="margin-left: 20px;"
          :label="`예`"
          :value="true"
        ></v-radio>
        <v-radio :label="`아니오`" :value="false"></v-radio>
      </v-radio-group>
    </v-container>

    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            id="priority"
            v-model.number="priority"
            :items="items"
            label="priority"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-for="item in DynamicallyAddingItems" :key="item">
      <v-text-field placeholder="새로운 상품번호와 내용을 입력해주세요">
      </v-text-field>
    </v-container>

    <v-btn @click="pushItems">상품추가</v-btn>

    <p>
      <v-btn type="submit" id="submit" value="Submit">저장</v-btn>
    </p>
    <v-btn v-model="finalTimeSet" @click="timeSet">test</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      title: null,
      start: new Date().toISOString().substr(0, 10),
      end: new Date().toISOString().substr(0, 10),
      show: null,
      priority: null,
      quantity: null,
      endPicker: null,
      startPicker: null,
      timeStart: "11:15",
      timeEnd: "11:10",
      finalTimeStart: null,
      finalTimeEnd: null,
      radioGroup: null,
      ExhibitionItems: [1],
      valueOfItems: 1,
      labelString: "items",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 1) || "최소 1글자 이상 적어주세요",
      ],
      items: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
      ],
    };
  },
  computed: {
    finalTimeSet() {
      return `${this.finalTimeStart} ${this.finalTimeEnd}`;
    },
    labelValue() {
      return this.labelString + this.valueOfItems;
    },

    DynamicallyAddingItems() {
      return this.ExhibitionItems;
    },
  },
  methods: {
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 5 === 0,
    timeSet() {
      this.finalTimeStart = this.timeStart + ":00";
      this.finalTimeEnd = this.timeEnd + ":59";
    },
    pushItems() {
      this.valueOfItems++;
      this.ExhibitionItems.push(this.valueOfItems);
    },
    onSubmit() {
      let ExhibitionInfo = {
        id: this.id,
        title: this.title,
        start: this.start,
        show: this.show,
        end: this.end,
        priority: this.priority,
        quantity: this.quantity,
      };
      this.$emit("exhibition-submitted", ExhibitionInfo);
      this.id = null;
      this.title = null;
      this.start = null;
      this.end = null;
      this.show = null;
      this.priority = null;
      this.quantity = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
