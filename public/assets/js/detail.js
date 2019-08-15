var id = getUrlParams('id')
var review;
$.ajax({
  url: '/posts/' + id,
  success: function (response) {
    var html = template('postTpl', response)
    $('.article').html(html)
  }
})

$('.article').on('click', '#like', function () {
  $.ajax({
    type: 'post',
    url: '/posts/fabulous/' + id,
    success: function () {
      alert('感谢支持')
    }
  })
})

// 评论
$.ajax({
  url: '/settings',
  success: function (response) {
     review = response.review
    if (response.comment) {
      var html = template('commentTpl')
      $('#comment').html(html)
    }
  },
  error: function(){
    alert('评论失败')
  }
})

if(review){
  state = 1 
}else{
  state = 0
}

$('#comment').on('submit', 'form', function () {
  var value = $(this).find('textarea').val()
  $.ajax({
    type: 'post',
    url: '/comments',
    data: {
      content: value,
      post: id,
      state: state
    },
    success: function(response){
      location.reload()
    }
  })
  return false;
})
