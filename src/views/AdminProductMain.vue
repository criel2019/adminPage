<template>
  <div class="AdminExhibition">
  <div class="leftBody">
   <SideNav />
  
   </div>
   <div class="rightBody">
       <!--DATATABLE--><v-app>
    <div>
      <v-banner color="grey lighten-1">
        <h3>{{ titleMain }}</h3>
  
      </v-banner>
    </div>
    
    <div class="my-2">
      <v-btn @click="onClick">check data</v-btn>
    </div>
    <v-simple-table>
      <template>
        <thead>
          <tr class="grey lighten-1">
            <th class="text-left">순번</th>
            
            <th class="text-left">일시</th>
            <th class="text-left">상품명</th>
            
            <th class="text-left">옵션명</th>
            <th class="text-left">구매자</th>
            
            <th class="text-left">전화번호</th>
            
            <th class="text-left">결제방법</th>
            
            <th class="text-left">상태</th>
          </tr>
        </thead>
        <tbody id="dragTable">
          <tr 
            v-for="item in desserts" 
            :key="itemKey(item)" 
            class="sortableRow sortHandle handle"
          >
            <td>{{ orderNumber(item) }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.optionName }}</td>
              <td>{{ item.userName }}</td>
                <td>{{ item.phone }}</td>
            <td>{{ item.methods }}</td>
            <td>{{ item.state }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    
    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title>desserts
          <v-spacer></v-spacer>
          <v-btn outlined color="info" text @click="dialog = false">CLOSE</v-btn>
        </v-card-title>
        <v-card-text class="pprint">{{ pprint }}</v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="info" text @click="dialog = false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>


    </div>
    </div>
</template>

<script>
import SideNav from  '../components/SideNav';
import Sortable from 'sortablejs';
export default {
  name: 'ProductMain',
   components: {
       SideNav,
  },

  mounted () {
    /* eslint-disable no-new */
    new Sortable(
      document.querySelector('#dragTable'),
      {
        draggable: '.sortableRow',
        handle: '.sortHandle',
        onEnd: this.dragReorder
      }
    )
  },   data: () => ({
   titleMain: "Drag & Drop of Vuetify's v-simple-table using SortableJS",
    titleSub: '[Vuetify 2.0.3 + SortableJS 1.10.1]',
    memo: 'UPDATE：2020-02-06 ',
    dialog: false,
    itemKeys: new WeakMap(),
    currentItemKey: 0,
   
    desserts: [{
         data: null,
    productName: null,
    optionName: null,
    userName: null,
    phone: null,
    methods: null,
    state:null},
          { id: 1001,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드', state: 200 },
          { id: 1002,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1003,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1004,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1005,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1006,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1007,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1008,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1009,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200},
          { id: 1010,date:'2021-12-01', productName: '일잘러 신입사원의 셀프 업무 관리 노하우', optionName: '일잘러 신입사원의 셀프 업무 관리 노하우', userName:'배문형(moonlygreat@gmail.com)', phone:'010-1234-1234', methods:'카드',state: 200}
        ]
  }),
  computed: {
    pprint: {
      get () { return JSON.stringify(this.desserts, undefined, 4)}
    },
  },
  methods: {
    itemKey (item) {
      if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
      return this.itemKeys.get(item)
    },
    dragReorder ({oldIndex, newIndex}) {
      const movedItem = this.desserts.splice(oldIndex, 1)[0]
      this.desserts.splice(newIndex, 0, movedItem)
    },
    orderNumber (item) {
      return this.desserts.indexOf(item) + 1
    },
    onClick () {
      this.dialog = true
    }
  }
}
</script>
<style scoped>
.handle {
  cursor: move;
}
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.01);
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.pprint {
  white-space:pre-wrap;
  word-wrap:break-word;
}
</style>