var key = getUrlParams('key')
$.ajax({
  url: '/posts/search/' + key,
  success: function(response){
    console.log(response)
    var html = template('searchTpl', {data: response});
    $('#content').html(html)
  }
})