$(function(){
  var $search_result = $('#user-search-result')
  var preInputs;
  function appendSearchUser(user){
    html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
            </div>`
    $('#user-search-result').append(html);
  }
  function appendGroupUser(user){
    html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
      <input name='group[user_ids][]' type='hidden' value=${user.id}>
      <p class='chat-group-user__name'>${user.name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    $('#chat-group-users').append(html);
  }

  $('#user-search-result').on("click",".user-search-add",function(){
    var user = {id: $(this).attr("data-user-id"), name: $(this).attr("data-user-name")};
    $(this).parent().remove();
    appendGroupUser(user);
  });
  $('#chat-group-users').on("click",".user-search-remove",function(){
    $(this).parent().remove();
  });

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    var inputs = input.split(" ").filter(function(e) { return e; });
    if (inputs != preInputs){
      $search_result.empty();
      if (inputs.length !== 0 ){
        inputs.forEach(function(input){
          $.ajax({
            type: "GET",
            url:  '/users',
            data: {keyword: input},
            dataType: 'json'
          })
          .done(function(users){
            if (users.length !== 0){
              users.forEach(function(user){
                appendSearchUser(user);
              });
            }
          })
          .fail(function(){
            alert("ユーザー検索に失敗しました");
          })
        })
      }
    }
    preInputs = inputs;
  })
});
