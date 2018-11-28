$(function(){

  var updateTimer = setInterval(function(){update()},5000);

  function update(){
    if ($('.chat-area').length !== 0 ){
      updateMessages();
    }
   }

  function updateMessages(){

    if ($('.message').length !== 0){
      var last_message_id = $('.message:first').attr('message-id');
      var last_message = $('.message:first');
    } else {
      var last_message_id = 0;
      var last_message = null;
    }

    var last_message_id= ($('.message').length !== 0)
                        ? $('.message:first').attr('message-id')
                        : 0;
    $.ajax({
      type: "GET",
      url: location.href,
      data: {message: {id: last_message_id}},
      dataType: 'json',
      processData: true,
      contentType: false,
      timeout: 10000
    })
    .done(function(messages){
      if (messages.length !==0){
        messages.forEach(function(message){
          var html =  buildHTML(message);
          if ($('.message').length !== 0) {
            $(html).insertBefore(last_message);
            last_message = $(`.message[message-id= ${message.id}]`)
          }else {
            $('.messages').prepend(html);
            last_message = $(`.message[message-id= ${message.id}]`)
          }
        });
      }
    })
    .fail(function(){
      clearInterval(updateTimer);
      alert('サーバーとの通信に失敗しました');
    })
  }

  function buildHTML(message){
    var html =$('<li>',{class: 'message', "message-id": message.id});
    var message_upper =$('<div>',{class: 'message_upper clearfix'});
    $(message_upper).append($('<p>',{class: 'message__username',text: message.user_name }));
    $(message_upper).append($('<p>',{class: 'message__created-at',
                            text: message.created_at}));
    $(html).append(message_upper);
    var message_bottom =$('<div>',{class: 'message_bottom clearfix'});
    var content = $('<p>',{class: 'message__content',
                            text: message.content});
    var image = $('<img>',{class:'message__image',
                          src: message.image.url,
                          alt: message.image.alt});
    message_bottom = ((message.content !==null ) &&  (message.image.url !==null ))
      ? $(message_bottom).append($(content)).append($(image))
      : (message.content !==null ) ? $(message_bottom).append($(content))
      : $(message_bottom).append($(image))
    $(html).append(message_bottom);

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
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
      var html = buildHTML(message);
      $('.messages').prepend(html)
      $('#message_content').val('')
      $(".new_message__button").removeAttr("disabled");
    })
    .fail(function(){
      $(".new_message__button").removeAttr("disabled");
      alert('error');
    })
  });
})
