<template>
  <div class="rightBody">
    <div v-if="isDataReady">
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
          :items="itemInfo"
          :search="search"
          class="tableList"
        >
          <template v-slot:item.productName="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <router-link
                  class="event-link"
                  :to="{ name: 'Product', params: { id: item.itemId } }"
                >
                  <v-btn rounded color="grey lighten-1" v-on="on">
                    <div class="text-truncate" style="max-width: 500px">
                      {{ item.productName }}
                    </div>
                  </v-btn>
                </router-link>
              </template>
              <span>{{ item.productName }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  created() {
    EventService.allItemsInfo()
      .then((response) => {
        this.allItemsInfo = response.data;
        console.log(this.allItemsInfo);
        console.log("준비가 될 때까지 기다려주세요");
        this.readyToShow();
      })
      .catch((error) => {
        console.log("에러 발생");
        console.log(error.response);
      });
  },
  data() {
    return {
      search: "",
      isDataReady: false,
      allItemsInfo: null,
      headers: [
        {
          text: "_id",
          value: "itemId",
          width: 50,
          sortable: false,
          align: "start",
          filterable: false,
        },
        { text: "상품명", value: "productName", sortable: false, width: 500 },
        { text: "저자", value: "author", sortable: false, width: 100 },
        { text: "삭제여부", value: "deleteYN", width: 100 },
        { text: "옵션개수", value: "quantity", sortable: false, width: 100 },
        { text: "태그", value: "tag", width: 250 },
      ],
    };
  },
  methods: {
    readyToShow() {
      if (this.exhibitions !== null) return (this.isDataReady = true);
      else {
        this.isDataReady = this.readyToShow();
      }
    },
  },
  computed: {
    itemInfo() {
      if (this.allItemsInfo === undefined || this.allItemsInfo === null)
        return console.log("불러오지 못했음");
      else {
        var itemId = [];
        var productName = [];
        var author = [];
        var deleteYN = [];
        var quantity = [];
        var tag = [];
        var result = [];

        for (
          var index = 0;
          index < this.allItemsInfo.itemInfo.length;
          index++
        ) {
          itemId[index] = this.allItemsInfo.itemInfo[index].itemId;
          productName[index] = this.allItemsInfo.itemInfo[index].title;
          author[index] = this.allItemsInfo.itemInfo[index].owner;
          deleteYN[index] = this.allItemsInfo.itemInfo[index].deleteYN;
          quantity[index] = this.allItemsInfo.itemInfo[index].options.length;
          tag[index] = this.allItemsInfo.itemInfo[index].tag;

          result[index] = {
            itemId: itemId[index],
            productName: productName[index],
            author: author[index],
            deleteYN: deleteYN[index],
            quantity: quantity[index],
            tag: tag[index],
          };
        }

        return result;
      }
    },
    tagValue() {
      return this.productItems[0].tag + "tag1";
    },
  },
};
</script>
<style scoped>
.event-link {
  text-decoration: none;
}
</style>
