<template>
  <v-app>
    <div class="rightBody">
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-app>
</template>
<script>
import EventService from "@/services/EventService.js";
export default {
  created() {
    EventService.getUserInfo() // <-----
      .then((response) => {
        this.apis = response.data; // <--- set the events data
        console.log(response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  computed: {
    users() {
      if (this.apis === undefined || this.apis === null)
        return console.log("아직 불러오지 못했음");
      else {
        var id = [];
        var name = [];
        var sns = [];
        var mail = [];
        var start = [];
        var phone = [];
        var company = [];
        var job = [];
        var years = [];
        var result = [];

        for (var index = 0; index < this.apis.result.length; index++) {
          id[index] = this.apis.result[index].userId;
          name[index] = this.apis.result[index].username;
          if (this.apis.result[index].kakaoId !== undefined)
            sns[index] = "kakao";
          else if (this.apis.result[index].googleId !== undefined)
            sns[index] = "google";
          else if (this.apis.result[index].naverId !== undefined)
            sns[index] = "naver";
          else console.log("소셜 로그인 정보를 불러오지 못했음");

          mail[index] = this.apis.result[index].email;
          start[index] = this.apis.result[index].createdAt;
          phone[index] = this.apis.result[index].phone;
          company[index] = this.apis.result[index].company;
          job[index] = this.apis.result[index].jobDepartment;
          years[index] = this.apis.result[index].career;

          result[index] = {
            id: id[index],
            name: name[index],
            sns: sns[index],
            mail: mail[index],
            start: start[index],
            phone: phone[index],
            company: company[index],
            job: job[index],
            years: years[index],
          };
        }

        return result;
      }
    },
  },
  data() {
    return {
      apis: null,
      headers: [
        {
          text: "_id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "이름", value: "name" },
        { text: "SNS", value: "sns" },
        { text: "메일", value: "mail" },
        { text: "가입일", value: "start" },
        { text: "연락처", value: "phone" },
        { text: "회사명", value: "company" },
        { text: "직무", value: "job" },
        { text: "연차", value: "years" },
      ],
    };
  },
};
</script>
