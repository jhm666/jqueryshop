var id = getUrlParams('id')

$.ajax({
  url: '/posts/category/' + id,
  success: function(response){
    console.log(response)
    var html = template('contentTpl', {data: response})
    $('#content').html(html)
  }
})