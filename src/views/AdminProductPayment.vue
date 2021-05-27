<template>
  <div class="AdminExhibition">
    <div class="rightBody">
      <!--DATATABLE-->
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
        >
          <template v-slot:item.userOrderId="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 50px">
                    {{ item.userOrderId }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.userOrderId }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.date="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 130px;">
                    {{ item.date }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.date }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.productName="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <router-link
                  class="event-link"
                  :to="{ name: 'PaymentDetail', params: { id: item.orderId } }"
                >
                  <v-btn rounded color="grey lighten-1" v-on="on">
                    <div class="text-truncate" style="max-width: 180px">
                      {{ item.productName }}
                    </div>
                  </v-btn>
                </router-link>
              </template>
              <span>{{ item.productName }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.optionName="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 70px">
                    {{ item.optionName }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.optionName }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.user="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 130px">
                    {{ item.user }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.user }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.payMethod="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 120px">
                    {{ item.payMethod }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.payMethod }}</span>
            </v-tooltip>
          </template>

          <template v-slot:item.status="{ item }">
            <v-tooltip color="grey darken-3" top>
              <template v-slot:activator="{ on }">
                <v-chip outlined v-on="on">
                  <div class="text-truncate" style="max-width: 120px">
                    {{ item.status }}
                  </div>
                </v-chip>
              </template>
              <span>{{ item.status }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  name: 'ProductPayment',
  data() {
    return {
      apis: [],
      search: '',
      headers: [
        {
          text: '상품주문번호',
          value: 'userOrderId',
          width: 50,
          align: 'start',
          filterable: false
        },
        { text: '일시', value: 'date', width: 130 },
        { text: '상품명', value: 'productName', sortable: false, width: 100 },
        { text: '옵션명', value: 'optionName', sortable: false, width: 70 },
        { text: '구매자', value: 'user', sortable: false, width: 60 },
        { text: '결제방식', value: 'payMethod', width: 60 },
        { text: '상태', value: 'status', width: 100 }
      ]
    }
  },
  computed: {
    paymentValue() {
      if (this.apis.result === undefined) return this.apis.result
      else {
        var userOrderId = []
        var orderId = []
        var date = []
        var productName = []
        var optionName = []
        var user = []
        var payMethod = []
        var status = []
        var result = []

        for (var index = 0; index < this.apis.result.length; index++) {
          userOrderId[index] = this.apis.result[index].orderIdForCustomer
          orderId[index] = this.apis.result[index].orderId
          date[index] = this.apis.result[index].createdOrderTime
          productName[index] = this.apis.result[index].itemName
          optionName[index] = this.apis.result[index].optionName
          user[index] =
            this.apis.result[index].userName +
            '(' +
            this.apis.result[index].userEmail +
            ')'
          payMethod[index] = this.apis.result[index].payMethod
          status[index] = this.apis.result[index].status

          result[index] = {
            userOrderId: userOrderId[index],
            orderId: orderId[index],
            date: date[index],
            productName: productName[index],
            optionName: productName[index],
            user: user[index],
            payMethod: payMethod[index],
            status: status[index]
          }
        }

        return result
      }
    }
  },
  created() {
    EventService.getEvents() // <-----
      .then(response => {
        this.apis = response.data // <--- set the events data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>
<style scoped>
.event-link {
  text-decoration: none;
}
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
  white-space: pre-wrap;
  word-wrap: break-word;
}
.back {
  display: block;
  float: left;
}
.TableList {
  text-overflow: ellipsis;
}
.event-link {
  text-decoration: none;
}
</style>
