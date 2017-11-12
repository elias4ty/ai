// btn.one('click',function(){
//
//     var that = this;
//     $(this).text('扫描中...');
//
//     $.ajax('/ai',{
//         success : function(r){
//             r = JSON.parse(r)
//             console.log(r)
//             if(r.status == 200 && r.message == 'OK'){
//                 let result = $('.end').append('<img src="'+r.url+'" alt="end" width="300">');
//                 $(that).text('扫描结束!')
//             }
//         }
//     })
// })

var upload = $('input');

upload.bind('change',function (pic) {
    console.log(this.files)
    var data = new FormData();
    data.append('picture',this.files[0])

    $.ajax({
        url : '/savePic/',
        method : 'POST',
        data : data,
        processData: false,
        contentType: false
    }).then(function (result) {
            result = JSON.parse(result)
            if(result && result.status == 200){
                $('.input img').attr('src','file://'+result.url)
            }
    })
})