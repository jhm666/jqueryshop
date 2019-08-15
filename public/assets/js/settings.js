$('#file').on('change', function(){
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    contentType: false,
    processData: false, // 告诉$.ajax方法不要解析请求参数
    success: function(response){
      $('#logo').val(response[0].avatar)
      $('#image').attr('src', response[0].avatar)
    }
  })
})

$('.form-horizontal').on('submit', function(){
  var formData = $(this).serialize()
  $.ajax({
    type: 'post',
    url: '/settings',
    data: formData,
    success: function(){
      location.reload()
    }
  })
  return false;
})

$.ajax({
  type: 'get',
  url: '/settings',
  success: function(response){
    $('#image').attr('src', response.logo)
    $('input[name="title"]').val(response.title)
    $('#comment').prop('checked', response.comment)
    $('#review').prop('checked', response.review)
  }
})