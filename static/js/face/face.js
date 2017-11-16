var upload = $('input'),btn = $('button'),file = null,data = new FormData();

upload.bind('change',function () {

    if(!/(.*)\.(jpg|png)$/g.test(this.files[0].name)){
      alert('请上传有效图片')
      this.clear()
      return
    }

    file = { 'filename' : this.files[0].name };
    data.append('picture',this.files[0])

    $.ajax({
        url : '/ai/savePic/',
        method : 'POST',
        data : data,
        processData: false,
        contentType: false
    }).then(function (result) {
            result = JSON.parse(result)
            if(result && result.status == 200){
                $('.input img').attr('src',result.url)
            }
    })
})

btn.one('click',function(){

    if(!file){
      alert('请上传文件！')
      return
    }
    var that = this;
    $(this).text('扫描中...');

    $.ajax({
        url:'/ai/',
        method : 'POST',
        data : file,
        success : function(r){
            r = JSON.parse(r)
            console.log(r)
            if(r.status == 200 && r.message == 'OK'){
                $('.output img').attr('src',r.url)
		            $(that).text('扫描结束!')
            }
        }
    })
})
