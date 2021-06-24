<template>
  <v-app>
    <v-app-bar style="height: 64px;" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <img src="./assets/advist.svg" />
    </v-app-bar>
    <v-navigation-drawer
      color="grey lighten-3"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="grey lighten-1--text text--accent-4"
        >
          <router-link class="link-to" to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-palette-advanced</v-icon>
              </v-list-item-icon>
              <v-list-item-title>기획전</v-list-item-title>
            </v-list-item></router-link
          >

          <router-link class="link-to" to="/detail">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-file-document-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>상품상세</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link class="link-to" to="/payment">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-currency-usd</v-icon>
              </v-list-item-icon>
              <v-list-item-title>주문</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link class="link-to" to="/user">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>회원관리</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card
      class="xl-auto lg-auto md-auto sm-auto xs-auto overflow-hidden"
      :height="height"
    >
      <router-view @controlHeight="increaseWindowSize" />
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    height: "5000",
  }),
  methods: {
    increaseWindowSize(event) {
      this.event = event;
      this.height = this.height + event;
      console.log(this.height);
    },
  },
};
</script>
<style>
.link-to {
  text-decoration: none;
  color: grey;
  font-size: 18px;
}

.text {
  margin-top: 100px;
}
.no-exhibition {
  margin: 30px;
  text-align: center;
  font-size: 25px;
}
.review-form {
  font-size: 35px;
  width: 900px;
  height: 1200px;
  padding: 20px;
  margin: 150px 0 0 450px;
  border: 1px solid #d8d8d8;
}

.formContent {
  width: 100%;
  height: 100px;
}

option[value="null"][disabled] {
  display: none;
}

option {
  color: black;
}

.cancel {
  float: left;
  width: 150px;
  height: 80px;
  margin-top: 30px;
}

.save {
  float: right;
  width: 150px;
  height: 80px;
  margin-top: 30px;
}

.createButtons {
  float: right;
  width: 350px;
  height: 100px;
}
.orderSave {
  float: left;
  width: 150px;
  height: 80px;
  font-size: 25px;
}

.newExhibition {
  float: left;
  width: 150px;
  margin-left: 50px;
  height: 80px;
  font-size: 25px;
}
.rightBody {
  float: left;
  position: absolute;
  top: 200px;
  left: 100px;
  width: 1200px;
  height: 100%;
}
.leftBody {
  float: left;
  width: 100px;
  height: 100%;
}
.nonNavList {
  font-size: 25px;
  padding: 25px 0;
  font-weight: 900;
}
.navList {
  font-size: 25px;
  padding: 25px 0;
}

.sideNavList {
  margin: 500px 30px;
  width: 100px;
}
/*   Add a black background color to the top navigation */
.topnav {
  background-color: #333;

  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
}
li {
  list-style: none;
}
</style>
