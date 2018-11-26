$(function(){

  function buildHTML(message){
    var html = `<li class='message'>
                  <p class='message__username'>
                    ${ message.user_name} *
                  </p>
                  <p class='message__created-at'>
                    ${message.created_at}
                  </p>`
    if (message.content !==null ) {
      html = $(html).append( `<p class="message__content">
                    ${message.content} </p>`)
    }
    if (message.image.url !==null){
      html = $(html).append( `<img class="message__image" src=${message.image.url}  alt=${message.image.alt} />`)
    }
    html = $(html).append( `</li>`)

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
      $(".message-form__button").removeAttr("disabled");
    })
    .fail(function(){
      $(".message-form__button").removeAttr("disabled");
      alert('error');
    })
  });
})
