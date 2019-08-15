$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var html = template('tpl', { data: response })
    $('#category').html(html)
  }
})

$('#parentBox').on('change', '#feature', function () {
  var formData = new FormData();
  formData.append('cover', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#thumbnail').val(response[0].cover)
    }
  })
})

$('#addForm').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/posts',
    data: formData,
    success: function () {
      location.href = '/admin/posts.html'
    },
    error: function () {
      alert(11)
    }
  })
  return false;
})

function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  for (var i = 0, len = paramsAry.length; i < len; i++) {
    var temp = paramsAry[i].split('=');
    if (name == temp[0]) {
      return temp[1]
    }
  }
  return -1
}
var id = getUrlParams('id')

if(id != -1){
  $.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function(response){
      $.ajax({
        type: 'get',
        url: '/categories',
        success: function(categories){
          response.categories = categories
          var html = template('modifyTpl', response)
          $('#parentBox').html(html)
        }
      })
    }
  })
}

$('#parentBox').on('submit', '#modifyForm', function(){
  var id = $(this).attr('data-id');
  var formData = $(this).serialize()
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: function(response){
      // location.href = '/admin/posts.html'
    }
  })
  return false;
})