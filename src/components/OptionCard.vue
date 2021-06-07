<template>
  <v-card>
    <v-list-item-title
      class="headline mb-1"
      style="margin-left: 20px; padding-top:20px;"
    >
      상품명{{ index + 1 }}
    </v-list-item-title>
    <v-col>
      <v-text-field
        v-model="owner"
        label="옵션명"
        hide-details="auto"
        outlined
      ></v-text-field>
    </v-col>
    <v-col>
      <v-textarea outlined name="introduction" label="옵션설명"></v-textarea>
    </v-col>
    <v-col>
      <v-text-field outlined name="career" label="정가"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field outlined name="career" label="할인가"></v-text-field>
    </v-col>
    <v-container class="px-0" fluid style="margin-left: 20px;">
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
  </v-card>
</template>
<script>
export default {
  props: ["numbering", "index"],

  data() {
    return {
      owner: "owner",
      radioGroup: false,
      titleNumber: null,
    };
  },
  watch: {
    numberingAlignment() {
      this.titleNumber = this.numbering;
      return this.titleNumber;
    },
  },
};
</script>
