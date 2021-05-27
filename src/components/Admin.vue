<template>
  <div class="admin">
    <div class="rightBody">
      <div v-if="!newExhibition">
        <v-data-table
          :headers="headers"
          :items="ExhibitionsList"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>

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
        <div class="cancelAndSave">
          <v-btn width="100" class="cancel" @click="switchSection()"
            >취소</v-btn
          >
          <v-btn width="100" class="save" @click="switchSection()">저장</v-btn>
        </div>
        <AddExhibition style="position: relative; top: 50px;" />

        <div class="display"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AddExhibition from './AddExhibition'
import EventService from '../services/EventService'

export default {
  components: {
    AddExhibition
  },
  created() {
    EventService.getExhibition() // <--- Send the prop id to our EventService
      .then(response => {
        this.exhibitions = response.data
        console.log('기획전' + this.exhibitions.exhibition)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  data() {
    return {
      exhibitions: null,
      bestExhibitions: null,
      newExhibition: true,
      headers: [
        {
          text: '_id',
          align: 'start',
          sortable: false,
          value: 'ExhibitionId'
        },
        { text: '제목', value: 'title' },
        { text: '전시시작', value: 'dateStart' },
        { text: '종료', value: 'dateEnd' },
        { text: '공개', value: 'show' },
        { text: '우선순위', value: 'rank' },
        { text: '상품개수', value: 'lengthOfItems' }
      ]
    }
  },
  methods: {
    switchSection() {
      this.newExhibition = !this.newExhibition
    }
  },
  computed: {
    ExhibitionsList() {
      if (this.exhibitions.exhibition === null) {
        console.log(this.exhibitions.exhibition)
        return this.exhibitions.exhibition
      } else {
        var exhibitionId = []
        var title = []
        var dateStart = []
        var dateEnd = []
        var show = []
        var rank = []
        var lengthOfItems = []
        var result = []
        for (
          var index = 0;
          index < this.exhibitions.exhibition.length;
          index++
        ) {
          exhibitionId[index] = this.exhibitions.exhibition[index].exhibitionId
          title[index] = this.exhibitions.exhibition[index].title
          dateStart[index] = this.exhibitions.exhibition[index].title
          dateEnd[index] = this.exhibitions.exhibition[index].dateEnd
          show[index] = this.exhibitions.exhibition[index].visible
          rank[index] = this.exhibitions.exhibition[index].rank
          lengthOfItems[index] = this.exhibitions.exhibition[
            index
          ].itemId.length
          result[index] = {
            exhibitionId: exhibitionId[index],
            title: title[index],
            dateStart: dateStart[index],
            dateEnd: dateEnd[index],
            show: show[index],
            rank: rank[index],
            lengthOfItems: lengthOfItems[index]
          }
        }
        return result
      }
    }
  }
}
</script>

<style scoped>
.tableHeader {
  margin: 150px 0 0 0;
  font-size: 23px;
}
</style>
