<template>
  <v-app>
    <v-card
      class="xl-auto lg-auto md-auto sm-auto xs-auto overflow-hidden"
      height="5000px"
    >
      <v-app-bar dark>
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
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>회원관리</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
<style scoped>
.link-to {
  text-decoration: none;
  color: grey;
  font-size: 18px;
}
</style>
