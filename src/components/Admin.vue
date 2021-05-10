<template>
   <div class="admin">
 <div class="leftBody">
   <SideNav />
  
   </div>
   <div class="rightBody">


   <div v-if="!newExhibition">
    
     <div class="tableHeader">
        
        <table>
            <tr>
            <th width="200">_id</th>
            <th width="500">제목</th>
            <th width="300">전시시작</th>
            <th width="300">종료</th>
            <th width="200">공개</th>
            <th width="200">우선순위</th>
            <th width="200">상품개수</th>
              </tr>
        </table>

    </div>
      
     <p class="no-exhibition" v-if="!exhibitions.length">등록된 기획전이 없습니다.</p>
     
      <TableContent :exhibitions="exhibitions" />
      <div class="createButtons">
      <button class="orderSave">순서 저장
      </button>
      <button class="newExhibition" @click="switchSection()">새 기획전</button>
      </div>
 
  </div>
 
     <div v-else>
     <div class="cancelAndSave">
     <button class="cancel" @click="switchSection()">취소</button>
     <button class="save" @click="switchSection()">저장</button>
     </div>
 
     <AddExhibition class="test" @exhibition-submitted="addExhibition" />
     <div class="display">
     
    </div>
    </div>
   </div> 
   </div>
</template>

<script>
import AddExhibition from './AddExhibition.vue'
import TableContent from './Table-content.vue'
import SideNav from './SideNav'


export default {
    components: {
    AddExhibition,
    TableContent,
    SideNav,
  },
   data() {
      return {
          // id: [0, 1, 2, 3, 4, 5, 6],
          // title: ["모두의 최애가 되는 방법", "일찍 퇴근하는 비법", "로또 없어도 15억 버는 방법", "6시 칼퇴하는 방법", "당신만 모르는 편리한 단축키", "영어 몰라도 자료 찾는 법", "업무 자동화 비전"],
          // start: ["2021-01-01", "2021-01-02", "2021-01-03", "2021-01-04", "2021-01-05", "2021-01-06", "2021-01-07"],
          // end: ["2021-12-01", "2021-12-02", "2021-12-03", "2021-12-04", "2021-12-05", "2021-12-06", "2021-12-07"],
          // show: [false, true, false, true, false, true, true],
          // priority: [1, 0, 2, 3, 4, 6, 5],
          // quantity: [5, 3, 6, 3, 6, 6, 6],
          exhibitions: [],
          newExhibition: true

      }
  },
  methods: {


      addExhibition(ExhibitionInfo) {
          this.exhibitions.push(ExhibitionInfo)
      },
      switchSection(){
         this.newExhibition = !this.newExhibition
      }

  },
  computed: {
  }

}
</script>


<style scoped>

.tableHeader{
    margin: 150px 0 0 0;
    font-size: 23px;
}
</style>
