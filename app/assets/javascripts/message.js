$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log("submit");
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      console.log("done");
    })
    .fail(function(){
      alert('error');
    })
  });
})
