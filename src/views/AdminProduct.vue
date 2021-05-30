<template>
  <div class="rightBody">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="paymentValue"
        :search="search"
        class="tableList"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "_Id",
          value: "userOrderId",
          width: 50,
          align: "start",
          filterable: false,
        },
        { text: "상품명", value: "productName", sortable: false, width: 100 },
        { text: "저자", value: "author", sortable: false, width: 60 },
        { text: "공개여부", value: "show", width: 100 },
        { text: "상품개수", value: "quantity", sortable: false, width: 70 },
        { text: "태그", value: "tag", width: 60 },
      ],
    };
  },
};
</script>
