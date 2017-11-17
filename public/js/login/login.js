new Vue({
  el : '#elias',
  data : {
    uph : 'Username',
    pph : 'Password',
    userName : 'Username',
    pwdName : 'Password',
    userValue : '',
    pwdValue : '',
    data : new FormData(),
    referer : ''
  },
  mounted(){

    let search = location.search.substr(1).split('&');

    for(let s of search){
        if(/referer/g.test(s)){
            search = s.split('=')[1];
            this.referer = search;
            break
        }
    }
  },
  methods : {
    comein(type,btn){
      if(btn == 'user'){
          if(!this.userValue && type == 'focus')this.uph = ''
          if(!this.userValue && type == 'blur')this.uph = this.userName
      }
      if(btn == 'pwd'){
        if(!this.pwdValue && type == 'focus')this.pph = ''
        if(!this.pwdValue && type == 'blur')this.pph = this.pwdName
      }
    },
    login(){

        if(this.userValue === '' || this.pwdValue === ''){
            alert('用户名或者密码不能为空')
            return
        }
        this.data.append('user',this.userValue);
        this.data.append('pwd',this.pwdValue);
        this.data.append('referer',this.referer);

        let vm = this;
        $.ajax({
            url : '/validate',
            data : vm.data,
            method : 'POST',
            processData : false,
            contentType : false
        }).then( res => {
              if(res.status == 'ok'){
                  location.href = res.url
              }else{
                  alert(res.message)
              }
        })
    }
  }
})



// function _id(id){
//     return document.getElementById(id)
// }
//
// var input = $('input'),
//     referer = _id('referer'),
//     user = _id('user'),
//     pwd = _id('pwd'),
//     submit = $('#submit');
//
// input.bind('focus',function(){
//     if(!$(this).val()){
//       $(this).attr('placeholder','');
//     }
// }).bind('blur',function(){
//   if(!$(this).val()){
//     $(this).attr('placeholder',$(this).attr('name'));
//   }
// })
//
// submit.bind('click',function () {
//
//     var data = new FormData();
//
//     if(user.value === '' || pwd.value === ''){
//         alert('用户名或者密码不能为空')
//         return
//     }
//     data.append('user',user.value);
//     data.append('pwd',pwd.value);
//     data.append('referer',referer.value);
//
//     $.ajax({
//         url : '/validate',
//         data : data,
//         method : 'POST',
//         processData : false,
//         contentType : false
//     }).then(function (res) {
//             if(res.status == 'ok'){
//                 location.href = res.url
//             }else{
//                 alert(res.message)
//             }
//         })
// })
// var search = location.search.substr(1).split('&');
//
// for(var s in search){
//     if(/referer/g.test(search[s])){
//         search = search[s].split('=')[1];
//         $(referer).val(search)
//         break
//     }
// }
