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
      timeout: 60000
    })
    .done(function(messages){
      if ((messages.length !==0)&&($(".new_message__button").attr("disabled") !== 0)){
        messages.forEach(function(message){
          addMessageToChatArea(message);
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
    var message_upper =
        `<div class="message_upper clearfix">
          <p class="message__username">${message.user_name}</p>
          <p class="message__created-at">${message.created_at}</p>
        </div>`;
    var message_bottom = `<div class="message_bottom clearfix"></div>`;
    var content =
        `<div class="message__content">
          <p>${message.content}</p>
        </div>`;
    var image =
        `<div class="message__image">
          <img class="message__image__img" src=${message.image_url} alt=${message.image_alt}>
        </div>`;
    $(html).append(message_upper);
    message_bottom = ((message.content !==null ) &&  (message.image_url !==null ))
      ? $(message_bottom).append($(content)).append($(image))
      : (message.content !==null ) ? $(message_bottom).append($(content))
      : $(message_bottom).append($(image))
    $(html).append(message_bottom);

    return html;
  }

  function addMessageToChatArea(message){
    var $messages = $('.message');
    var message_ids = $messages.map(function(i, element){
      return parseInt($(element).attr('message-id'))
    }).toArray();
    if (message_ids.includes(message.id) !== true) { //メッセージがすでにある場合はスキップ
      var html =  buildHTML(message);
      if (message_ids.length == 0){
        $message.parent().prepend(html);
      } else {
        last_message_id = message_ids.find(function(id){return id < message.id})
        console.log("last_message_id: " + last_message_id);
        last_message = $(`.message[message-id= ${last_message_id}]`);
        $(html).insertBefore(last_message);
      }
    }
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
      addMessageToChatArea(message);
      $('#message_content').val('');
      $('#message_image').val('');
      $(".new_message__button").removeAttr("disabled");
    })
    .fail(function(){
      $(".new_message__button").removeAttr("disabled");
      alert('error');
    })
  });
})
