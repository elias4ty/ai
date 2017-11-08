(function($){
  var input = $('input');

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
