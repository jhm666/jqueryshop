$.ajax({
  type: 'get',
  url: '/posts',
  success: function(response){
    var html = template('postsTpl', response)
    $('#tb').html(html)
    var page = template('pageTpl', response);
    $('#page').html(page);
  }
})

// 分页
function changePage(page) {
  // 向服务器端发送请求 获取文章列表数据
  $.ajax({
      type: 'get',
      url: '/posts',
      data: {
          page: page
      },
      success: function(response) {
          var html = template('postsTpl', response);
          $('#tb').html(html);
          var page = template('pageTpl', response);
          $('#page').html(page);
      }
  });
}

$.ajax({
  type: 'get',
  url: '/categories',
  success: function(response){
    var html = template('categoryTpl', {data: response})
    $('#category').html(html)
  }
})

$('.form-inline').on('submit', function(){
  var formData = $(this).serialize();
  $.ajax({
    type: 'get',
    url: '/posts',
    data: formData,
    success: function(response){
      var html = template('postsTpl', response);
      $('#tb').html(html);
      var page = template('pageTpl', response);
      $('#page').html(page);
    }
  })
  return false;
})

$('#tb').on('click', '.delete', function(){
 if(confirm('您真的要删除吗?')){
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'delete',
    url: '/posts/' + id,
    success: function(){
      location.reload()
    }
  })
 }
})