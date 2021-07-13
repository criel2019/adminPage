<template>
  <v-container>
    <v-row>
      <v-list-item-title
        class="headline mb-1"
        style="margin-left: 20px; padding-top:20px;"
      >
        옵션#{{ index + 1 }}
      </v-list-item-title>
    </v-row>
    <v-col>
      <v-text-field
        v-model="optionNameV"
        label="옵션명"
        hide-details="auto"
        outlined
        v-on:input="updateName($event)"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-textarea
        outlined
        v-model="optionDescV"
        name="introduction"
        label="옵션설명"
        v-on:input="updateDesc($event)"
      ></v-textarea>
    </v-col>
    <v-col>
      <v-text-field
        v-model="optionTypeV"
        label="옵션타입"
        hide-details="auto"
        outlined
        v-on:input="updateType($event)"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        outlined
        v-model="optionPriceV"
        name="career"
        label="정가"
        v-on:input="updatePrice($event)"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        outlined
        v-model="optionDiscountV"
        name="career"
        label="할인가"
        v-on:input="updateDiscount($event)"
      ></v-text-field>
    </v-col>
    <v-row>
      <v-col cols="12" sm="6" md="4" style="margin-left: 10px;">
        <v-menu
          ref="menu"
          v-model="startDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="optionStartDateV"
              label="시작 날짜를 입력해주세요"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="optionStartDateV" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startDate = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                [
                  $refs.menu.save(optionStartDateV),
                  (startDate = false),
                  updateStartDate(optionStartDateV),
                ]
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="endDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="optionEndDateV"
              label="종료 날짜를 입력해주세요"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="optionEndDateV" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endDate = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                [
                  $refs.menu.save(optionEndDateV),
                  (endDate = false),
                  updateEndDate(optionEndDateV),
                ]
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col></v-row
    >
    <v-row>
      <v-col cols="11" sm="5" style="margin-left: 10px;">
        <v-dialog
          ref="dialog"
          v-model="modal1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="optionStartTimeV"
              label="시작 시간을 설정해주세요."
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal1"
            :allowed-minutes="allowedStep"
            v-model="optionStartTimeV"
            format="24hr"
            full-width
            use-seconds
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal1 = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                [
                  $refs.dialog.save(optionStartTimeV),
                  (modal1 = false),
                  updateStartTime(optionStartTimeV),
                ]
              "
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
      <v-col cols="11" sm="5">
        <v-dialog ref="dialog" v-model="modal2" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="optionEndTimeV"
              label="종료 시간을 입력해주세요."
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal2"
            :allowed-minutes="allowedStep"
            v-model="optionEndTimeV"
            format="24hr"
            full-width
            use-seconds
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal2 = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                [
                  $refs.dialog.save(optionEndTimeV),
                  (modal2 = false),
                  updateEndTime(optionEndTimeV),
                ]
              "
            >
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col></v-row
    >
    <v-container class="px-0" fluid style="margin-left: 20px;">
      <v-radio-group v-model="optionDeleteV" row @change="updateDelete($event)"
        >삭제여부:

        <v-radio
          style="margin-left: 20px;"
          :label="`예`"
          :value="true"
        ></v-radio>
        <v-radio :label="`아니오`" :value="false"></v-radio>
      </v-radio-group>
    </v-container>
  </v-container>
</template>
<script>
export default {
  props: [
    "index",
    "optionType",
    "optionName",
    "optionDesc",
    "optionPrice",
    "optionDiscount",
    "optionDelete",
    "optionStartDate",
    "optionEndDate",
    "optionStartTime",
    "optionEndTime",
  ],

  data() {
    return {
      modal1: false,
      modal2: false,
      startDate: false,
      endDate: false,
      optionIdV: [],
      optionTypeV: [],
      optionNameV: [],
      optionDescV: [],
      optionPriceV: [],
      optionDiscountV: [],
      optionDeleteV: [],
      optionStartDateV: [],
      optionEndDateV: [],
      optionStartTimeV: [],
      optionEndTimeV: [],
    };
  },
  created() {
    this.optionIdV = this.index + 1;
    this.optionTypeV = this.optionType;
    this.optionNameV = this.optionName;
    this.optionDescV = this.optionDesc;
    this.optionPriceV = this.optionPrice;
    this.optionDiscountV = this.optionDiscount;
    this.optionDeleteV = this.optionDelete;
    this.optionStartDateV = this.optionStartDate;
    this.optionEndDateV = this.optionEndDate;
    this.optionStartTimeV = this.optionStartTime;
    this.optionEndTimeV = this.optionEndTime;
  },
  methods: {
    allowedHours: (v) => v % 2,
    allowedMinutes: (v) => v >= 10 && v <= 50,
    allowedStep: (m) => m % 5 === 0,
    sendData() {
      let optionData = {
        optionId: this.optionIdV,
        dateStart: this.optionStartDateV + " " + this.optionStartTimeV,
        dateEnd: this.optionEndDateV + " " + this.optionEndTimeV,
        title: this.optionNameV,
        file: "",
        type: this.optionTypeV,
        desc: this.optionDescV,
        price: this.optionPriceV,
        discountPrice: this.optionDiscountV,
        deleteYN: this.optionDeleteV,
      };
      return optionData;
    },
    deleteEvent() {
      this.$emit("deleteEvent");
    },
    updateName(v) {
      let eventbus = {
        optionName: v,
        index: this.index,
      };
      this.$emit("updateName", eventbus);
    },
    updateDesc(v) {
      let eventbus = {
        optionDesc: v,
        index: this.index,
      };
      this.$emit("updateDesc", eventbus);
    },
    updateType(v) {
      let eventbus = {
        optionType: v,
        index: this.index,
      };
      this.$emit("updateType", eventbus);
    },
    updatePrice(v) {
      let eventbus = {
        optionPrice: v,
        index: this.index,
      };
      this.$emit("updatePrice", eventbus);
    },
    updateDiscount(v) {
      let eventbus = {
        optionDiscount: v,
        index: this.index,
      };
      this.$emit("updateDiscount", eventbus);
    },
    updateDelete(v) {
      let eventbus = {
        optionDelete: v,
        index: this.index,
      };
      this.$emit("updateDelete", eventbus);
    },
    updateStartDate(v) {
      let eventbus = {
        optionStartDate: v,
        index: this.index,
      };
      this.$emit("updateStartDate", eventbus);
    },
    updateEndDate(v) {
      let eventbus = {
        optionEndDate: v,
        index: this.index,
      };
      this.$emit("updateEndDate", eventbus);
    },
    updateStartTime(v) {
      let eventbus = {
        optionStartTime: v,
        index: this.index,
      };
      this.$emit("updateStartTime", eventbus);
    },
    updateEndTime(v) {
      let eventbus = {
        optionEndTime: v,
        index: this.index,
      };
      this.$emit("updateEndTime", eventbus);
    },
  },
};
</script>
