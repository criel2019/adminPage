<template>
  <div class="AdminExhibition">
    <div class="rightBody">
      <v-card ref="form">
        <v-btn style="margin: 20px 0 0 30px;">취소</v-btn>

        <router-link class="event-link" :to="{ name: 'Product' }">
          <v-btn style="float: right; margin: 20px 30px 0 0;"
            >저장</v-btn
          ></router-link
        >

        <v-card-text>
          <v-col>
            <v-text-field
              v-model="id"
              label="Id"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="title"
              label="상품명"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>

          <v-container class="px-0" style="margin-left: 15px;" fluid>
            <v-radio-group v-model="radioGroup" row
              >공개여부:

              <v-radio
                style="margin-left: 20px;"
                :label="`none`"
                :value="1"
              ></v-radio>
              <v-radio :label="`new`" :value="2"></v-radio>
              <v-radio :label="`best`" :value="3"></v-radio>
            </v-radio-group>
          </v-container>

          <v-row>
            <v-col>
              <v-text-field
                v-model="tag1"
                label="태그1"
                hide-details="auto"
                style="width:180px; margin-left: 10px;"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="tag2"
                label="태그2"
                hide-details="auto"
                style="width:180px; margin-left: 15px;"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="tag3"
                label="태그3"
                hide-details="auto"
                style="width:180px; margin-left: 30px;"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="tag4"
                label="태그4"
                hide-details="auto"
                style="width:180px; margin-left: 50px;"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-col>
            <v-text-field
              v-model="owner"
              label="Owner"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-textarea
              outlined
              name="introduction"
              label="코치 소개"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              outlined
              name="career"
              label="주요 경력 및 이력"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </v-col>

          <v-progress-linear
            color="grey darken-1"
            rounded
            value="100"
          ></v-progress-linear>
          <template>
            <v-file-input
              style="margin-top: 50px; padding: 0 10px;"
              accept="image/*"
              label="상품 썸네일"
              outlined
            ></v-file-input>
          </template>
          <div class="editorWraper">
            <editor
              ref="toastuiEditor"
              height="500px"
              initialEditType="markdown"
              previewStyle="vertical"
            />
            <v-btn
              @click="getMarkdown"
              style="width: 100px; float: right; height: 50px; margin-top: 30px;"
              >파일 업로드</v-btn
            >
            <div v-for="(file, index) in fileList" :key="file.Key">
              #{{ index + 1 }}{{ file.Key }}
              <v-btn @click="deleteFiles(file.Key)" color="red" text
                >삭제</v-btn
              >
              <v-btn @click="setFiles(file.Key)" color="green" text
                >파일 열기</v-btn
              >
            </div>
          </div>

          <template>
            <v-file-input
              style="margin-top: 50px; padding: 0 10px;"
              accept="image/*"
              label="후기 이미지"
              outlined
            ></v-file-input>
          </template>

          <v-progress-linear
            color="grey darken-1"
            rounded
            value="100"
          ></v-progress-linear>

          <div v-for="(options, index) in optionItems" :key="options">
            <OptionCard
              :index="index"
              :numbering="numbering"
              class="optionCard"
            >
            </OptionCard>
          </div>
          <v-btn
            style="float: right; margin-top:30px;"
            width="100"
            height="50"
            @click="[pushOptions(), NumberingFunction(), callParentFunction()]"
            >상품추가</v-btn
          >
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import OptionCard from "@/components/OptionCard.vue";
import { Editor } from "@toast-ui/vue-editor";
export default {
  name: "Exhibition",
  components: {
    editor: Editor,
    OptionCard,
  },
  data() {
    return {
      numbering: 1,
      id: "id",
      title: "title",
      tag1: "tag1",
      tag2: "tag2",
      tag3: "tag3",
      tag4: "tag4",
      owner: "owner",
      optionItems: [0],
      radioGroup: 2,
      ItemsIndex: 0,
      file: null,
      MarkdownsBucketName: "advist",
      bucketRegion: "ap-northeast-2",
      IdentityPoolId: "ap-northeast-2:322e4b0e-9752-4390-a444-24f67b4afccf",
      fileList: [],
      URL: null,
    };
  },
  created() {
    this.getFiles();
  },
  methods: {
    NumberingFunction() {
      this.numbering++;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    pushOptions() {
      this.ItemsIndex++;
      this.optionItems.push(this.ItemsIndex);
    },
    callParentFunction() {
      this.$emit("controlHeight", 691); // emit an event to parent
      console.log("it's working");
    },
    uploadFile() {
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.MarkdownsBucketName },
      });

      let key = "AdminPage1.md";
      s3.upload(
        {
          Key: key,
          Body: this.file,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return alert(
              "There was an error uploading your html: ",
              err.message
            );
          }
          alert("Successfully uploaded html.");
          this.getFiles();
          console.log(data);
        }
      );
    },
    getFiles() {
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.MarkdownsBucketName },
      });

      s3.listObjects({ Delimiter: "/" }, (err, data) => {
        if (err) {
          return alert(
            "There was an error listing your Markdownss: " + err.message
          );
        } else {
          this.fileList = data.Contents;
          console.log(data);
        }
      });
    },
    deleteFiles(key) {
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.MarkdownsBucketName },
      });

      s3.deleteObject({ Key: key }, (err, data) => {
        if (err) {
          return alert(
            "There was an error deleting your MarkdownFile: ",
            err.message
          );
        }
        alert("Successfully deleted MarkdownFile.");
        this.getFiles();
        console.log(data);
      });
    },
    scroll() {
      this.$refs.toastuiEditor.invoke("scrollTop", 10);
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke("moveCursorToStart");
    },
    getMarkdown() {
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      (this.file = markdown), this.uploadFile();
    },
    setMarkdown(data) {
      this.editor = this.$refs.toastuiEditor.invoke("setMarkdown", data);
    },
    setContent(data) {
      this.setMarkdown(data);
    },
    setFiles() {
      const fileUrl = URL; // provide file location

      fetch(fileUrl)
        .then((r) => r.text())
        .then((t) => this.setContent(t));
    },
  },
};
</script>
<style scoped>
.editorWraper {
  width: 1175px;
  height: 600px;
  margin-top: 50px;
  padding: 0 10px;
}
.optionCard {
  margin-top: 40px;
}
</style>
