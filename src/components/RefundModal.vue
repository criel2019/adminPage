<template>
  <v-card>
    <v-card-title>
        {{ headerTitle }}
    </v-card-title>
    <v-card-text style="">
      <slot name="body">
      </slot>
    </v-card-text>
    <v-card-actions class="justify-end mr-2 pb-4">
        <v-btn 
            color="grey"
            large
            dark
            absolute
            left
            @click="$emit('hide')"
            style="margin: 0 0px 40px 70px;"
        >
            {{ footerHideTitle }}
        </v-btn>
        <template v-if="footerSubmit">
            <v-btn
                color="grey"
                large
                dark
                absolute
                right
                @click="$emit('submit')"
                  style="margin: 0 70px 40px 0;"
            >
                {{ footerSubmitTitle }}
            </v-btn>
        </template>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'RoRoDialog',
    props: {
      footerSubmit: {
        type: Boolean,
        default: true,
      },
      headerTitle: {
        type: String,
        default: '제목',
      },
      footerSubmitTitle: {
        type: String,
        default: '저장',
      },
      footerHideTitle: {
        type: String,
        default: '취소',
      },
    },
  }
</script>