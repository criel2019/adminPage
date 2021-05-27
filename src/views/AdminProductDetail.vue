<template>
  <div class="AdminExhibition">
  <div class="leftBody">
   <SideNav />
  
   </div>
   <div class="rightBody">
<div class="editorWraper">
    <v-btn @click="getMarkdown" style="width: 200px; height: 100px;">파일 업로드</v-btn>
    <editor ref="toastuiEditor"
    height="500px"
    initialEditType="markdown"
    previewStyle="vertical"/>
</div>
<div v-for="(file, index) in fileList" :key="file.Key">
#{{index + 1}}{{file.Key}}
<v-btn @click="deleteFiles(file.Key)" color="red" text>삭제</v-btn>
<v-btn @click="setFiles(file.Key)" color="green" text>파일 열기</v-btn>
</div>
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
      MarkdownsBucketName: 'advist',
      bucketRegion: 'ap-northeast-2',
      IdentityPoolId: 'ap-northeast-2:322e4b0e-9752-4390-a444-24f67b4afccf',
        fileList: [],
        URL: null,
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
  params: {Bucket: this. MarkdownsBucketName}
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
        params: {Bucket: this.MarkdownsBucketName}
        })

        s3.listObjects({Delimiter: '/'}, (err, data) =>{
            if (err) {
             return alert('There was an error listing your Markdownss: ' + err.message);
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
  params: {Bucket: this.MarkdownsBucketName}
});
       
       s3.deleteObject({Key: key}, (err, data)=> {
    if (err) {
      return alert('There was an error deleting your MarkdownFile: ', err.message);
    }
    alert('Successfully deleted MarkdownFile.');
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
      setMarkdown(data){
          this.editor = this.$refs.toastuiEditor.invoke('setMarkdown',data)
      },
      setContent(data){
           this.setMarkdown(data)
      },
      setFiles(){
      const fileUrl = URL // provide file location

fetch(fileUrl)
   .then( r => r.text() )
   .then( t => this.setContent(t) )

    }
    }
}
</script>
<style scoped>
.editorWraper{
    width: 1000px;
    height: 800px;
}
</style>