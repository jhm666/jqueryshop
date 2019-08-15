
$('#addCategories').on('submit', function () {
  var formData = $(this).serialize()
  $.ajax({
    type: 'post',
    url: '/categories',
    data: formData,
    success: function () {
      location.reload()
    }
  })
  return false
})

$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var html = template('cateTpl', { data: response })
    $('#tb').html(html)
  }
})

$('#tb').on('click', '.edit', function () {
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function(response){
      var html = template('addTpl',response)
      $('#addForm').html(html)
    }
  })
})

$('#addForm').on('submit', '#editCategories', function(){
  var id = $(this).attr('data-id')
  var formData = $(this).serialize()
  $.ajax({
    type: 'put',
    url: '/categories/' + id,
    data: formData,
    success: function(){
      location.reload()
    }
  })
  return false;
})

$('#tb').on('click', '.delete', function(){
  var id = $(this).attr('data-id')
 if(confirm('您确认要删除吗?')){
  $.ajax({
    type: 'delete',
    url: '/categories/' + id,
    success: function(){
      location.reload()
    }
  })
 }
})


