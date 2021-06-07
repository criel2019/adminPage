<template>
  <div class="addExhibition">
    <div class="cancelAndSave">
      <v-btn
        width="100"
        class="cancel"
        @click="[resetCurrentValue(), switchSection()]"
        >취소</v-btn
      >
      <v-btn width="100" class="save" v-model="finalTimeSet" @click="onSubmit()"
        >저장</v-btn
      >
    </div>
    <v-card ref="form" style="position:relative;top:100px;">
      <v-col>
        <v-text-field
          v-model="currentValue.title"
          label="Title"
          :rules="rules"
          hide-details="auto"
          outlined
          style="margin-top:50px; width:1200px;"
        ></v-text-field>
      </v-col>
      <v-col style=" margin-top:50px;">
        <v-row>
          <v-col>
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
                  v-model="currentValue.dateStart"
                  label="기획전 시작날짜 선택"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="currentValue.dateStart"
                @input="startPicker = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
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
                  v-model="currentValue.dateEnd"
                  label="기획전 종료날짜 선택"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="currentValue.dateEnd"
                @input="endPicker = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="space-around">
          <v-col>
            <v-time-picker
              v-model="currentValue.timeStart"
              :allowed-minutes="allowedStep"
              class="mt-4 "
              format="24hr"
              color="red lighten-3"
              :landscape="$vuetify.breakpoint.mdAndUp"
              header-color="blue lighten-3"
              style="margin-left:70px;"
            ></v-time-picker>
          </v-col>
          <v-col>
            <v-time-picker
              v-model="currentValue.timeEnd"
              :allowed-minutes="allowedStep"
              class="mt-4"
              format="24hr"
              color="deep-orange lighten-3"
              header-color="cyan lighten-3"
              :landscape="$vuetify.breakpoint.mdAndUp"
              style="margin-left:70px;"
            ></v-time-picker>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-radio-group v-model="currentValue.show" column mandatory>
          <p>공개여부</p>

          <v-radio :label="`공개`" :value="true"></v-radio>
          <v-radio :label="`비공개`" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-container fluid>
        <v-row align="center">
          <v-col>
            <v-text-field
              id="priority"
              v-model.number="currentValue.rank"
              :items="currentValue.rank"
              label="priority"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-col>
        <v-progress-linear
          color="grey darken-1"
          rounded
          value="100"
        ></v-progress-linear>
      </v-col>
      <v-container v-for="(item, index) in currentItemInfo" :key="index"
        ><p>상품 순서 #{{ index + 1 }}</p>
        <v-select
          id="addItems"
          v-model="addItems[index]"
          :items="addItems"
          required
          :rules="law.select"
          outlined
        ></v-select>
      </v-container>
      <v-col>
        <v-row>
          <v-col>
            <v-btn style="float:right;" @click="pushItems">상품추가</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import EventService from "../services/EventService";
export default {
  props: {
    switchSection: { type: Function },
    currentId: {
      type: Number,
      required: false,
    },
    currentTitle: {
      type: String,
      required: false,
    },
    currentDateStart: {
      type: String,
      required: false,
    },
    currentDateEnd: {
      type: String,
      required: false,
    },
    currentShow: {
      type: Boolean,
      required: false,
    },
    currentRank: {
      type: Number,
      required: false,
    },
    currentLengthOfItems: {
      type: Number,
      required: false,
    },
    currentItemInfo: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.currentValue.id = this.currentId;
    this.currentValue.title = this.currentTitle;
    var startString = this.currentDateStart;
    if (startString !== null) {
      var splitedWords1 = startString.split(" ");
      var dateStart = splitedWords1[0];
      var timeStart = splitedWords1[1];
    }
    this.currentValue.timeStart = timeStart;
    this.currentValue.dateStart = dateStart;
    var endString = this.currentDateEnd;
    if (endString !== null) {
      var splitedWords2 = endString.split(" ");
      var dateEnd = splitedWords2[0];
      var timeEnd = splitedWords2[1];
    }
    this.currentValue.timeEnd = timeEnd;
    this.currentValue.dateEnd = dateEnd;
    this.currentValue.show = this.currentShow;
    this.currentValue.rank = this.currentRank;
    this.currentValue.lengthOfItems = this.currentLengthOfItems;
    this.currentValue.itemInfo = this.currentItemInfo;
    if (this.currentItemInfo.length == 0) this.pushItems();
  },
  data() {
    return {
      currentValue: {},
      index: 0,
      start: new Date().toISOString().substr(0, 10),
      end: new Date().toISOString().substr(0, 10),
      startPicker: null,
      endPicker: null,
      finalTimeStart: null,
      finalTimeEnd: null,
      radioGroup: null,
      labelString: "items",
      itemsId: ["359", "200"],
      itemsName: ["어쩌구 저쩌구", "쓰레기!"],
      law: {
        select: [(v) => !!v || "Item is required"],
        select2: [(v) => v.length > 0 || "Item is required in select 2"],
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 1) || "최소 1글자 이상 적어주세요",
      ],
    };
  },
  computed: {
    addItems: {
      get() {
        var itemArray = [];
        if (
          this.currentValue.itemInfo.length == 1 ||
          this.currentValue.itemInfo == undefined
        ) {
          itemArray.push("상품을 추가해주세요");
        } else {
          for (var k = 0; k < this.currentValue.itemInfo.length; k++) {
            itemArray.push(
              this.currentValue.itemInfo[k].itemId +
                " " +
                this.currentValue.itemInfo[k].title
            );
          }
        }
        return itemArray;
      },

      set() {},
    },
    finalTimeSet() {
      return `${this.finalTimeStart} ${this.finalTimeEnd}`;
    },
    labelValue() {
      return this.labelString + this.valueOfItems;
    },
  },
  methods: {
    updateExhibitionFunction() {
      EventService.updateExhibition(
        this.currentId,
        this.currentTitle,
        this.currentDateStart,
        this.currentDateEnd,
        this.currentShow,
        this.currentRank,
        this.currentItemInfo
      );
    },
    newExhibitionFunction() {
      EventService.newExhibitionSave(
        this.currentId,
        this.currentTitle,
        this.currentDateStart,
        this.currentDateEnd,
        this.currentShow,
        this.currentRank,
        this.currentItemInfo
      );
    },
    resetCurrentValue() {
      this.currentValue.id = null;
      this.currentValue.title = null;
      this.currentValue.dateStart = null;
      this.currentValue.dateEnd = null;
      this.currentValue.show = null;
      this.currentValue.rank = null;
      this.currentValue.itemInfo = [];
      this.$emit("child", this.currentValue);
    },
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 5 === 0,
    timeSet() {
      this.finalTimeStart = this.currentValue.timeStart + ":00";
      this.finalTimeEnd = this.currentValue.timeEnd + ":59";
    },
    pushItems() {
      this.currentValue.itemInfo.push("상품을 추가해주세요");
    },
    onSubmit() {
      this.timeSet();
      if (this.currentValue.id == null) {
        this.newExhibitionFunction();
        console.log("새로운 기획전이 추가됨");
      } else this.updateExhibitionFunction();

      this.resetCurrentValue();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
