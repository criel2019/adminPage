<template>
  <v-app>
    <div class="rightBody">
      <v-main>
        <v-container>
          <router-link class="event-link" :to="{ name: 'Payment' }">
            <v-btn class="back" width="100" height="50" absolute>뒤로</v-btn>
          </router-link>

          <v-btn
            class="refund"
            width="100"
            height="50"
            absolute
            right
            v-show="showBtn"
            @click="showDialog"
          >
            환불요청
          </v-btn>
          <v-dialog max-width="500" v-model="dialogShow">
            <refund-modal
              header-title="환불 이유를 선택해주세요."
              @hide="hideDialog"
              @submit="submitDialog"
            >
              <template v-slot:body>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col class="d-flex" cols="12" sm="10">
                      <v-select
                        v-model="selectedValue"
                        full-width
                        :items="items"
                        label="취소 사유"
                        outlined
                        @change="selcetChagned(selectedValue)"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-show="showInput"
                    label="환불 이유를 입력해주세요."
                    v-model="refundReason"
                  ></v-text-field>
                </v-container>
              </template>
            </refund-modal>
          </v-dialog>
        </v-container>
        <v-card class="tableBody">
          <v-card-title>
            주문내역 확인하기
            <v-spacer></v-spacer>
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
            :items="computedApis"
            :search="search"
            disable-sort
            :items-per-page="16"
          ></v-data-table>
        </v-card>
      </v-main>
    </div>
  </v-app>
</template>
<script>
import EventService from '@/services/EventService.js'
import RefundModal from '../components/RefundModal.vue'
export default {
  props: ['id'],
  created() {
    EventService.getURL(this.id) // <--- Send the prop id to our EventService
      .then(response => {
        this.apis = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })

    if (this.id === undefined) this.$router.push('/payment')
  },
  components: {
    RefundModal
  },

  data() {
    return {
      dialogShow: false,
      refundReason: null,
      selectedValue: null,
      showInput: false,
      items: [
        { text: '결제 검증 실패' },
        { text: '고객 단순 변심' },
        { text: '코치 일정 불가' },
        { text: '기타' }
      ],
      apis: [],
      search: '',
      refresh: null,
      showBtn: false,
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: '주문 역할',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '상품 정보', value: 'orderInfo' }
      ]
    }
  },

  methods: {
    showf() {
      if (
        this.apis.result.status == 1 ||
        this.apis.result.status == 2 ||
        this.apis.result.status == 4
      )
        return (this.showBtn = true)
    },
    selcetChagned(value) {
      if (value == '기타') {
        this.showInput = true
      } else {
        this.showInput = false
        this.refundReason = value
      }
    },
    showDialog() {
      this.dialogShow = true
    },
    hideDialog() {
      this.dialogShow = false
    },
    submitDialog() {
      console.log('submit 완료!')
      this.refundRequest()
      this.apis.result.status = 3
      this.showBtn = false
      this.hideDialog()
    },
    refundRequest() {
      EventService.getRefund(this.apis.result.orderId, this.refundReason)
    }
  },
  computed: {
    computedApis() {
      if (this.apis.result === undefined) return this.apis.result
      else {
        this.showf()
        return [
          {
            name: '주문번호',
            orderInfo: this.apis.result.orderId
          },
          {
            name: '주문 생성일시',
            orderInfo: this.apis.result.createdOrderTime
          },
          {
            name: '고객명',
            orderInfo: this.apis.result.userName
          },
          {
            name: '이메일',
            orderInfo: this.apis.result.userEmail
          },
          {
            name: '전화번호',
            orderInfo: this.apis.result.userPhone
          },
          {
            name: '상품명',
            orderInfo: this.apis.result.itemName
          },
          {
            name: '옵션명',
            orderInfo: this.apis.result.optionName
          },
          {
            name: '정가',
            orderInfo: this.apis.result.price
          },
          {
            name: '할인금액',
            orderInfo: this.apis.result.discount
          },
          {
            name: '최종결제가격',
            orderInfo: this.apis.result.realPrice
          },
          {
            name: '결제방식',
            orderInfo: this.apis.result.payMethod
          },
          {
            name: 'Bootpay receipt ID',
            orderInfo: this.apis.result.bootPayReceiptId
          },
          {
            name: '결제 승인 일시',
            orderInfo: this.apis.result.purchasedTime
          },
          {
            name: '결제 취소 완료 일시',
            orderInfo: this.apis.result.evokedTime
          },
          {
            name: '상태',
            orderInfo: this.apis.result.status
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
.wrap {
  white-space: nowrap;
}
.tableBody {
  position: relative;
  top: 100px;
}
</style>
