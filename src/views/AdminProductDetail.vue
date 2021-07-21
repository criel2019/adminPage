<template>
  <div class="AdminExhibition">
    <div class="rightBody" v-if="isDataReady">
      <v-card ref="form">
        <router-link class="event-link" :to="{ name: 'Product' }">
          <v-btn style="margin: 20px 0 0 30px;">취소</v-btn>
        </router-link>
        <v-btn
          @click="getOptionDataValue"
          style="float: right; margin: 20px 30px 0 0;"
          >저장</v-btn
        >

        <v-card-text>
          <v-col>
            <v-text-field
              v-model="itemId"
              label="Id"
              hide-details="auto"
              outlined
              readonly
              class="py-1"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
              v-model="title"
              label="상품명"
              hide-details="auto"
              outlined
              class="py-1"
            ></v-text-field>
          </v-col>

          <v-container class="px-0" style="margin-left: 15px;" fluid>
            <v-radio-group v-model="labeling" row
              >뱃지:

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
          </v-row>
          <v-container class="px-0" fluid style="margin-left: 20px;">
            <v-radio-group v-model="deleteYN" row @change="updateDelete($event)"
              >삭제여부:

              <v-radio
                style="margin-left: 20px;"
                :label="`예`"
                :value="true"
              ></v-radio>
              <v-radio :label="`아니오`" :value="false"></v-radio>
            </v-radio-group>
          </v-container>
          <v-col>
            <v-text-field
              v-model="owner"
              label="Owner"
              hide-details="auto"
              outlined
              class="py-6"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-textarea
              outlined
              v-model="coachDesc"
              name="introduction"
              label="코치 소개"
            ></v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              outlined
              v-model="coachCareer"
              name="career"
              label="주요 경력 및 이력"
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
              show-size
              @change="uploadThumbnail"
              v-model="thumbnailFile"
            ></v-file-input>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="250"
              max-width="250"
              :src="thumbnailUrl"
            ></v-img>
            <v-select
              :items="selectMd"
              item-text="name"
              item-value="value"
              v-model="mdName"
              label="작성할 상세 내용을 선택해주세요"
              class="pa-3"
              required
              :rules="law"
            >
            </v-select>
          </template>
          <div class="editorWraper">
            <editor
              ref="toastuiEditor"
              height="500px"
              initialEditType="markdown"
              previewStyle="vertical"
            />

            <v-row>
              <v-btn
                @click="getMarkdown"
                width="100"
                absolute
                right
                style=" height: 50px; margin-top: 30px; margin-right: 140px;"
                >파일 업로드</v-btn
              >
              <v-dialog v-model="dialog" width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    absolute
                    right
                    width="120"
                    style="margin-top: 30px; height: 50px; margin-left: 20px;"
                  >
                    S3 관리 열기
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">S3 관리</span>
                  </v-card-title>
                  <div
                    v-for="(file, index) in fileList"
                    :key="file.Key"
                    style="padding: 0 10px;"
                  >
                    #{{ index + 1 }}: {{ file.Key }}
                    <v-btn @click="deleteFiles(file.Key)" color="red" text
                      >삭제</v-btn
                    >
                    <v-btn @click="setFiles(file.Key)" color="green" text
                      >파일 열기</v-btn
                    >
                  </div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
          <template>
            <v-file-input
              style=" padding: 0 10px;"
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

          <div v-for="(options, index) in numbering" :key="options">
            <v-card>
              <v-btn
                absolute
                right
                style="margin: 10px 5px;"
                @click="[deleteEvent(index), deleteOption(index)]"
                >삭제</v-btn
              >
              <option-card
                ref="optionCardref"
                :index="index"
                @updateName="updateName"
                @updateDesc="updateDesc"
                @updatePrice="updatePrice"
                @updateDiscount="updateDiscount"
                @updateDelete="updateDelete"
                @updateStartDate="updateStartDate"
                @updateStartTime="updateStartTime"
                @updateEndDate="updateEndDate"
                @updateEndTime="updateEndTime"
                @updateType="updateType"
                :numbering="numbering"
                class="optionCard"
                :optionName="optionName[index]"
                :optionDesc="optionDesc[index]"
                :optionPrice="optionPrice[index]"
                :optionDiscount="optionDiscount[index]"
                :optionDelete="optionDelete[index]"
                :optionStartDate="optionStartDate[index]"
                :optionEndDate="optionEndDate[index]"
                :optionStartTime="optionStartTime[index]"
                :optionEndTime="optionEndTime[index]"
                :optionId="optionId[index]"
                :optionType="optionType[index]"
              >
              </option-card>
            </v-card>
          </div>
          <v-btn
            style="float: right; margin-top:30px;"
            width="100"
            height="50"
            @click="[NumberingFunction(), callParentFunction()]"
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
import EventService from "@/services/EventService.js";
import { Editor } from "@toast-ui/vue-editor";
import OptionCard from "../components/OptionCard.vue";
export default {
  name: "Exhibition",
  components: {
    editor: Editor,
    OptionCard,
  },
  props: [`id`, `length`],
  data() {
    return {
      mdName: {
        name: null,
        value: null,
      },
      law: [(v) => !!v || "Item is required"],
      counter: 0,
      postData: [],
      optionData: [],
      numbering: [],
      itemId: null,
      itemInfo: null,
      coachDesc: null,
      coachCareer: null,
      isDataReady: false,
      title: null,
      tag1: null,
      tag2: null,
      tag3: null,
      deleteYN: null,
      badge: null,
      likes: null,
      optionName: [],
      optionDesc: [],
      optionPrice: [],
      optionDiscount: [],
      optionDelete: [],
      optionStartDate: [],
      optionEndDate: [],
      optionStartTime: [],
      optionEndTime: [],
      optionId: [],
      optionType: [],
      owner: null,
      radioGroup: null,
      selectMd: [
        { name: "상품설명", value: "desc" },
        { name: "자주 묻는 질문", value: "question" },
      ],
      fileType: null,
      file: null,
      thumbnailFile: null,
      thumbnailUrl: null,
      BucketName: "advist",
      bucketRegion: "ap-northeast-2",
      IdentityPoolId: "ap-northeast-2:322e4b0e-9752-4390-a444-24f67b4afccf",
      fileList: [],
      URL: "https://advist.s3.ap-northeast-2.amazonaws.com/testFile.md",
      dialog: false,
    };
  },
  computed: {
    labeling: {
      set() {},
      get() {
        return this.labelingF();
      },
    },
  },
  created() {
    this.getFiles();
    if ((this.id !== null || this.id !== undefined) && this.id !== 0) {
      EventService.getItem(this.id)
        .then((response) => {
          this.itemInfo = response.data;
          console.log("준비가 될 때까지 기다려주세요");
          this.itemId = this.id;
          this.title = this.itemInfo.item.title;
          this.owner = this.itemInfo.item.owner;
          this.tag1 = this.itemInfo.item.tag[0];
          this.tag2 = this.itemInfo.item.tag[1];
          this.tag3 = this.itemInfo.item.tag[2];
          this.badge = this.itemInfo.item.label;
          this.deleteYN = this.itemInfo.item.deleteYN;
          this.likes = this.itemInfo.item.likes;
          this.coachDesc = this.itemInfo.item.coachInfo.desc;
          this.coachCareer = this.itemInfo.item.coachInfo.career;
          for (var i = 0; i < this.itemInfo.item.options.length; i++) {
            this.optionName[i] = this.itemInfo.item.options[i].title;
            this.optionDesc[i] = this.itemInfo.item.options[i].desc;
            this.optionPrice[i] = this.itemInfo.item.options[i].price;
            this.optionDiscount[i] = this.itemInfo.item.options[
              i
            ].discountPrice;
            this.optionDelete[i] = this.itemInfo.item.options[i].deleteYN;
            this.optionType[i] = this.itemInfo.item.options[i].type;
            var split1 = this.itemInfo.item.options[i].dateStart.split(" ");
            this.optionStartDate[i] = split1[0];
            this.optionStartTime[i] = split1[1];
            var split2 = this.itemInfo.item.options[i].dateEnd.split(" ");
            this.optionEndDate[i] = split2[0];
            this.optionEndTime[i] = split2[1];
          }
          for (var l = 0; l < this.itemInfo.item.options.length; l++) {
            this.counter++;
            this.numbering.push(this.counter);
          }
          this.readyToShow();
        })
        .catch((error) => {
          console.log("에러 발생");
          console.log(error);
          this.$router.push({ name: "Product" });
        });
    } else if (this.id === 0) {
      this.itemId = this.length + 1;
      this.title = null;
      this.owner = null;
      this.tag1 = null;
      this.tag2 = null;
      this.tag3 = null;
      this.badge = "NONE";
      this.deleteYN = false;
      this.likes = 0;
      this.coachDesc = null;
      this.coachCareer = null;
      this.optionName[0] = null;
      this.optionDesc[0] = null;
      this.optionPrice[0] = null;
      this.optionDiscount[0] = null;
      this.optionDelete[0] = false;
      this.optionType[0] = null;
      (this.optionStartDate[0] = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)),
        (this.optionStartTime[0] = "00:00:00");
      (this.optionEndDate[0] = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10)),
        (this.optionEndTime[0] = "00:00:59");
      this.numbering.push(this.counter);
      this.readyToShow();
    } else {
      console.log("에러 발생");
    }
    this.getFiles();
    var thumbnailCheck = 0;
    for (var i = 0; i < this.fileList.length; i++)
      if (this.fileList[i].Key == "item/" + this.id + "/thumbnail.png")
        thumbnailCheck++;
    console.log(thumbnailCheck);
    if (thumbnailCheck === 0)
      this.thumbnailUrl =
        "https://lh3.googleusercontent.com/proxy/HlrSFA76DPBamkhCEAn5H79yQjijTEFkOWxBj1JsCk6aTDD6nResPt-iZstF-3ydCuS1DYBrj9FJ2PASRtWl3KyZvMnslIsYehNgAEOTLZiiebmgjqr6UCE_VYx3RwM";
    else this.setFiles("item/" + this.id + "/thumbnail.png");
  },
  methods: {
    deleteEvent: function(index) {
      this.numbering.splice(index, 1);
    },
    labelingF() {
      if (this.badge == "NONE") return (this.radioGroup = 1);
      else if (this.badge == "NEW") return (this.radioGroup = 2);
      else if (this.badge == "BEST") return (this.radioGroup = 3);
      else return console.log("에러 발생(labeling)");
    },
    labelingFBack() {
      if (this.radioGroup == 1) return (this.badge = "NONE");
      else if (this.radioGroup == 2) return (this.badge = "NEW");
      else if (this.radioGroup == 3) return (this.badge = "BEST");
      else return console.log("에러 발생(labeling)");
    },
    updateProductDetail() {
      EventService.updateProductDetail(this.postData);
    },
    newProductDetail() {
      EventService.newProductDetailSave(this.postData);
    },
    updateName(v) {
      this.optionName[v.index] = v.optionName;
    },
    updateDesc(v) {
      this.optionDesc[v.index] = v.optionDesc;
    },
    updatePrice(v) {
      this.optionPrice[v.index] = v.optionPrice;
    },
    updateDiscount(v) {
      this.optionDiscount[v.index] = v.optionDiscount;
    },
    updateDelete(v) {
      this.optionDelete[v.index] = v.optionDelete;
    },
    updateStartDate(v) {
      this.optionStartDate[v.index] = v.optionStartDate;
    },
    updateStartTime(v) {
      this.optionStartTime[v.index] = v.optionStartTime;
    },
    updateEndDate(v) {
      this.optionEndDate[v.index] = v.optionEndDate;
    },
    updateEndTime(v) {
      this.optionEndTime[v.index] = v.optionEndTime;
    },
    updateType(v) {
      this.optionType[v.index] = v.optionType;
    },
    deleteOption(index) {
      this.optionName.splice(index, 1);
      this.optionDesc.splice(index, 1);
      this.optionPrice.splice(index, 1);
      this.optionDiscount.splice(index, 1);
      this.optionDelete.splice(index, 1);
      this.optionStartDate.splice(index, 1);
      this.optionStartTime.splice(index, 1);
      this.optionEndDate.splice(index, 1);
      this.optionEndTime.splice(index, 1);
      this.optionType.splice(index, 1);
    },
    test() {
      console.log(this.mdName);
    },
    readyToShow() {
      if (this.itemInfo !== null || this.id === 0)
        return (this.isDataReady = true);
      else {
        this.isDataReady = this.readyToShow();
      }
    },
    getOptionDataValue() {
      for (var i = 0; i < this.$refs.optionCardref.length; i++)
        this.optionData[i] = this.$refs.optionCardref[i].sendData();
      this.setData();
    },
    setData() {
      if (this.itemId !== this.length + 1) {
        this.postData = {
          coachImg: "",
          coachInfo: {
            desc: this.coachDesc,
            career: this.coachCareer,
          },
          commentImg: "",
          deleteYN: this.deleteYN,
          img: "",
          itemId: this.itemId,
          label: this.labelingFBack(),
          likes: this.likes,
          title: this.title,
          owner: this.owner,
          tag: [this.tag1, this.tag2, this.tag3],
          template: this.itemInfo.item.template,
          options: this.optionData,
        };
        this.updateProductDetail();
      } else {
        this.postData = {
          coachImg: "",
          coachInfo: {
            desc: this.coachDesc,
            career: this.coachCareer,
          },
          commentImg: "",
          deleteYN: this.deleteYN,
          img: "",
          itemId: this.itemId,
          label: this.labelingFBack(),
          likes: this.likes,
          title: this.title,
          owner: this.owner,
          tag: [this.tag1, this.tag2, this.tag3],
          template: [{ title: "example", img: "" }],
          options: this.optionData,
        };
        this.newProductDetail();
      }
    },
    NumberingFunction() {
      this.counter++;
      this.numbering.push(this.counter);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    callParentFunction() {
      this.$emit("controlHeight", 691); // emit an event to parent
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
        params: { Bucket: this.BucketName },
      });

      let key = "item/" + this.id + "/" + this.mdName + ".md";
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
              "There was an error uploading your Markdown: ",
              err.message
            );
          }
          alert("Successfully uploaded file.");
          this.getFiles();
          console.log(data);
        }
      );
    },
    uploadThumbnail() {
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.BucketName },
      });

      let key = "item/" + this.id + "/thumbnail.png";
      s3.upload(
        {
          Key: key,
          Body: this.thumbnailFile,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return alert(
              "There was an error uploading your Thumbnail: ",
              err.message
            );
          }
          console.log("Successfully uploaded Thumbnail.");
          this.getFiles();
          console.log(data);
        }
      );
      this.setFiles("item/" + this.id + "/thumbnail.png");
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
        params: { Bucket: this.BucketName },
      });

      s3.listObjects(
        { Delimiter: "/", Prefix: "item/" + this.id + "/" },
        (err, data) => {
          if (err) {
            return alert(
              "There was an error listing your Markdownss: " + err.message
            );
          } else {
            console.log(data);
            this.fileList = data.Contents;
          }
        }
      );
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
        params: { Bucket: this.BucketName },
      });

      s3.deleteObject({ Key: key }, (err, data) => {
        if (err) {
          return alert("There was an error deleting your File: ", err.message);
        }
        alert("Successfully deleted File.");
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
    setThumbnail(url) {
      this.thumbnailUrl = url;
    },
    setContent(data) {
      this.setMarkdown(data);
    },
    setFiles(key) {
      AWS.config.update({
        region: this.bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.IdentityPoolId,
        }),
      });

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.BucketName },
      });
      var type = key.substring(key.lastIndexOf(".") + 1);
      s3.getSignedUrl(
        "getObject",
        { Expires: 60 * 60, Key: key },
        (err, url) => {
          console.log(err);
          console.log("The URL is", url);
          const fileUrl = url; // provide file location
          if (type === "md") {
            fetch(fileUrl)
              .then((r) => r.text())
              .then((t) => this.setContent(t));
          } else if (type === "png") this.setThumbnail(fileUrl);
          else return "error";
        }
      );
    },
  },
};
</script>
<style scoped>
.editorWraper {
  width: 1175px;
  height: 600px;
  padding: 0 10px;
}
.optionCard {
  margin-top: 40px;
}
.event-link {
  text-decoration: none;
}
</style>
