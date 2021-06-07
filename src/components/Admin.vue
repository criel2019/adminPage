<template>
  <div class="admin">
    <div class="rightBody">
      <div v-if="isDataReady">
        <div v-if="newExhibition">
          <v-data-table
            :headers="headers"
            :items="ExhibitionsList"
            :items-per-page="5"
            class="elevation-1"
            ><template v-slot:item.title="{ item }">
              <v-tooltip color="grey darken-3" top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    rounded
                    color="grey lighten-1"
                    v-on="on"
                    @click="
                      [
                        switchSection(),
                        infoSet(
                          item.exhibitionId,
                          item.title,
                          item.dateStart,
                          item.dateEnd,
                          item.show,
                          item.rank,
                          item.lengthOfItems,
                          item.itemInfo
                        ),
                      ]
                    "
                  >
                    <div class="text-truncate" style="max-width: 180px">
                      {{ item.title }}
                    </div>
                  </v-btn>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </template>
          </v-data-table>

          <p class="no-exhibition" v-if="!exhibitions.exhibition.length">
            등록된 기획전이 없습니다.
          </p>

          <div class="createButtons">
            <button class="orderSave">순서 저장</button>
            <button class="newExhibition" @click="switchSection()">
              새 기획전
            </button>
          </div>
        </div>
        <div v-else>
          <AddExhibition
            @child="parents"
            :switchSection="switchSection"
            :currentId="currentId"
            :currentTitle="currentTitle"
            :currentDateStart="currentDateStart"
            :currentDateEnd="currentDateEnd"
            :currentShow="currentShow"
            :currentRank="currentRank"
            :currentLengthOfItems="currentLengthOfItems"
            :currentItemInfo="currentItemInfo"
            style="position: relative; top: 50px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddExhibition from "./AddExhibition";
import EventService from "../services/EventService";

export default {
  components: {
    AddExhibition,
  },
  created() {
    EventService.getExhibition() // <--- Send the prop id to our EventService
      .then((response) => {
        this.exhibitions = response.data;
        console.log("준비가 될 때까지 기다려주세요");
        this.readyToShow();
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  data() {
    return {
      isDataReady: false,
      currentId: null,
      currentTitle: null,
      currentDateStart: null,
      currentDateEnd: null,
      currentShow: null,
      currentRank: null,
      currentLengthOfItems: null,
      currentItemInfo: [],
      exhibitions: null,
      bestExhibitions: null,
      newExhibition: true,
      headers: [
        {
          text: "_id",
          align: "start",
          sortable: false,
          value: "exhibitionId",
        },
        { text: "제목", value: "title" },
        { text: "전시시작", value: "dateStart" },
        { text: "종료", value: "dateEnd" },
        { text: "공개", value: "show" },
        { text: "우선순위", value: "rank" },
        { text: "상품개수", value: "lengthOfItems" },
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
    parents(currentValue) {
      this.currentId = currentValue.id;
      this.currentTitle = currentValue.title;
      this.currentDateStart = currentValue.dateStart;
      this.currentDateEnd = currentValue.dateEnd;
      this.currentShow = currentValue.show;
      this.currentRank = currentValue.rank;
      this.currentLengthOfItems = currentValue.lengthOfItems;
      this.currentItemInfo = currentValue.itemInfo;
    },
    infoSet(
      exhibitionId,
      title,
      dateStart,
      dateEnd,
      show,
      rank,
      lengthOfItems,
      itemInfo
    ) {
      this.currentId = exhibitionId;
      this.currentTitle = title;
      this.currentDateStart = dateStart;
      this.currentDateEnd = dateEnd;
      this.currentShow = show;
      this.currentRank = rank;
      this.currentLengthOfItems = lengthOfItems;
      this.currentItemInfo = itemInfo;
    },
    switchSection() {
      this.newExhibition = !this.newExhibition;
    },
  },
  computed: {
    ExhibitionsList() {
      if (
        this.exhibitions.exhibition == null ||
        this.exhibitions.exhibition == undefined
      ) {
        console.log(
          "데이터를 불러오는 것에 실패했습니다. 나중에 다시 시도해주세요."
        );
        return this.exhibitions.exhibition;
      } else {
        var exhibitionId = [];
        var title = [];
        var dateStart = [];
        var dateEnd = [];
        var show = [];
        var rank = [];
        var lengthOfItems = [];
        var result = [];
        var itemInfo = [];
        for (
          var index = 0;
          index < this.exhibitions.exhibition.length;
          index++
        ) {
          exhibitionId[index] = this.exhibitions.exhibition[index].exhibitionId;
          title[index] = this.exhibitions.exhibition[index].title;
          dateStart[index] = this.exhibitions.exhibition[index].dateStart;
          dateEnd[index] = this.exhibitions.exhibition[index].dateEnd;
          show[index] = this.exhibitions.exhibition[index].visible;
          rank[index] = this.exhibitions.exhibition[index].rank;
          itemInfo[index] = this.exhibitions.exhibition[index].itemInfo;
          lengthOfItems[index] = this.exhibitions.exhibition[
            index
          ].itemId.length;
          result[index] = {
            exhibitionId: exhibitionId[index],
            title: title[index],
            dateStart: dateStart[index],
            dateEnd: dateEnd[index],
            show: show[index],
            rank: rank[index],
            lengthOfItems: lengthOfItems[index],
            itemInfo: itemInfo[index],
          };
        }
        return result;
      }
    },
  },
};
</script>

<style scoped>
.tableHeader {
  margin: 150px 0 0 0;
  font-size: 23px;
}
.event-link {
  text-decoration: none;
}
</style>
