<template>
  <div class="sideNav">
    <ul class="sideNavList">
      <li
        @click="categorySwitch1()"
        :class="{ nonNavList: category, navList: !category }"
      >
        상품
      </li>
      <li
        class="navList"
        @click="categorySwitch2()"
        :class="{ navList: category, nonNavList: !category }"
      >
        기획전
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: true
    }
  },
  methods: {
    categorySwitch1() {
      if (!this.category) this.category = !this.category
    },
    categorySwitch2() {
      if (this.category) this.category = !this.category
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
