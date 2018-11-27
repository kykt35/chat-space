$(function(){
//todo ページ遷移対応
  console.log("timer start");
  var updateTimer = setInterval(function(){updateMessages()},5000);

  function updateMessages(){
    console.log("updateing");
    var last_message_id= ($('.message').length !== 0)
                        ? $('.message:last').attr('message-id')
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
      console.log("done");
      console.log(messages.length );
      var html = "";
      if (messages.length !==0){
        messages.forEach(function(message){
          var html =  buildHTML(message);
          $('.messages').append(html)
        });
      }

    })
    .fail(function(){
      console.log('error');
      clearInterval(updateTimer);
    })
  }

  function buildHTML(message){
    var html =$('<li>',{class: 'message', "message-id": message.id});
    $(html).append($('<p>',{class: 'message__username',text: message.user_name }));
    $(html).append($('<p>',{class: 'message__created-at',
                            text: message.created_at}));
    var content = $('<p>',{class: 'message__content',
                            text: message.content});
    var image = $('<img>',{class:'message__image',
                          src: message.image.url,
                          alt: message.image.alt});
    html = ((message.content !==null ) &&  (message.image.url !==null ))
      ? $(html).append($(content)).append($(image))
      : (message.content !==null ) ? $(html).append($(content))
      : $(html).append($(image))

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
      $('.messages').append(html)
      $('#message_content').val('')
      $(".new_message__button").removeAttr("disabled");
    })
    .fail(function(){
      $(".new_message__button").removeAttr("disabled");
      alert('error');
    })
  });
})
