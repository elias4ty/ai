(function($){
  function _id(id){
      return document.getElementById(id)
  }

  var input = $('input'),
      referer = _id('referer'),
      user = _id('user'),
      pwd = _id('pwd'),
      submit = $('#submit');

  input.bind('focus',function(){
      if(!$(this).val()){
        $(this).attr('placeholder','');
      }
  }).bind('blur',function(){
    if(!$(this).val()){
      $(this).attr('placeholder',$(this).attr('name'));
    }
  })

  submit.bind('click',function () {

      var data = new FormData();
      data.append('user',user.value);
      data.append('pwd',pwd.value);
      data.append('referer',referer.value);

      $.ajax({
          url : '/validate',
          data : data,
          method : 'POST',
          processData : false,
          contentType : false
      }).then(function (res) {
              if(res.status == 'ok'){
                  location.href = res.url
              }else{
                  alert(res.message)
              }
          })
  })
  var search = location.search.substr(1).split('&');

  for(var s in search){
      if(/referer/g.test(search[s])){
          search = search[s].split('=')[1];
          $(referer).val(search)
          break
      }
  }

})(jQuery)
