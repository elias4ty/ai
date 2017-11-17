new Vue({
  el : '#elias',
  delimiters: ['{', '}'],
  data : {
    fill : null,
    data : new FormData(),
    inputUrl : '/resource/images/default.jpg',
    ouputUrl : '/resource/images/default.jpg',
    btnText : '点击开始'
  },
  methods : {
       uploadFile(e){

         let inputFile = e.target;
         if(!/(.*)\.(jpg|png)$/g.test(inputFile.files[0].name)){
           alert('请上传有效图片')
           return
         }

         this.file = { 'filename' : inputFile.files[0].name };
         this.data.append('picture',inputFile.files[0])

         let vm = this;
         $.ajax({
             url : '/ai/savePic/',
             method : 'POST',
             data : vm.data,
             processData: false,
             contentType: false
         }).then((result) => {
                 result = JSON.parse(result)
                 if(result && result.status == 200){
                     vm.inputUrl = result.url
                 }
         })
     },
     identify(){

         if(!this.file){
           alert('请上传文件！')
           return
         }
         var that = this;
         that.btnText = '扫描中...';

         $.ajax({
             url:'/ai/',
             method : 'POST',
             data : that.file,
             success(r){
                 r = JSON.parse(r)
                 console.log(r)
                 if(r.status == 200 && r.message == 'OK'){
                     that.ouputUrl = r.url
                     that.btnText = '扫描结束!'
                 }
             }
         })
     }
  }
});
