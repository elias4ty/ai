(function($){
  function _id(id){
      return document.getElementById(id)
  }

  var input = $('input'),
      form = $('form'),
      user = _id('user'),
      pwd = _id('pwd');

  input.bind('focus',function(){
      if(!$(this).val()){
        $(this).attr('placeholder','');
      }
  }).bind('blur',function(){
    if(!$(this).val()){
      $(this).attr('placeholder',$(this).attr('name'));
    }
  })

})(jQuery)
