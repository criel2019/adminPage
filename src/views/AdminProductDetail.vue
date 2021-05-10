<template>
  <div class="AdminExhibition">
  <div class="leftBody">
   <SideNav />
  
   </div>
   <div class="rightBody">
<div class="editorWraper">
    <v-btn @click="getMarkdown" style="width: 200px; height: 100px;">here</v-btn>
    <editor ref="toastuiEditor"
    height="500px"
    initialEditType="markdown"
    previewStyle="vertical"/>
</div>
<div v-for="(file, index) in fileList" :key="file.Key">
#{{index + 1}}{{file.Key}}
<v-btn @click="deleteFiles(file.Key)" color="red" text>삭제</v-btn>
</div>
<v-container><h1>파일 업로더</h1>
<input type="file" id="file-uploader" ref="file" @change="handleFileUpload()">
<v-btn @click="uploadFile" color="primary" text>파일 업로드</v-btn>
</v-container> 

    </div>
    </div>
</template>

<script>
import AWS from 'aws-sdk';
import SideNav from  '../components/SideNav';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';
export default {
  name: 'Exhibition',
   components: {
       SideNav,
       editor: Editor,
  },
  data(){
 return { 
      file: null,
      albumBucketName: 'advist',
      bucketRegion: 'ap-northeast-2',
      IdentityPoolId: 'ap-northeast-2:322e4b0e-9752-4390-a444-24f67b4afccf',
        fileList: [],
 }
  },
  created(){
      this.getFiles()
  },
  methods:{
      handleFileUpload(){
          this.file = this.$refs.file.files[0];
      },
      uploadFile(){
          AWS.config.update({
  region: this.bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: this.IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: this. albumBucketName}
});

let key = "AdminPage1.md"
s3.upload({
    Key: key,
    Body: this.file,
    ACL: 'public-read'
  }, (err, data)=> {
    if (err) {
        console.log(err)
      return alert('There was an error uploading your html: ', err.message);
    }
    alert('Successfully uploaded html.');
    this.getFiles()
    console.log(data)
  });

      },
      getFiles(){
          AWS.config.update({
            region: this.bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: this.IdentityPoolId
            })
        })

         var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: this. albumBucketName}
        })

        s3.listObjects({Delimiter: '/'}, (err, data) =>{
            if (err) {
             return alert('There was an error listing your albums: ' + err.message);
            } else {
                this.fileList = data.Contents
            console.log(data)
            }
            });
        }, 
      deleteFiles(key){
AWS.config.update({
  region: this.bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: this.IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: this. albumBucketName}
});
       
       s3.deleteObject({Key: key}, (err, data)=> {
    if (err) {
      return alert('There was an error deleting your photo: ', err.message);
    }
    alert('Successfully deleted photo.');
    this.getFiles()
    console.log(data)
  });
       }, 
     scroll() {
        this.$refs.toastuiEditor.invoke('scrollTop', 10);
      },
      moveTop() {
        this.$refs.toastuiEditor.invoke('moveCursorToStart');
      },
      getMarkdown() {
        let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
            this.file = markdown,
            
            this.uploadFile()
      },
    } 
}
</script>
<style scoped>
.editorWraper{
    width: 1000px;
    height: 800px;
}
</style>