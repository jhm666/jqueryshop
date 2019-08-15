
$.ajax({
  type: 'get',
  url: '/posts/count',
  success: function (response) {
    $('#listOne').html(`<strong>${response.postCount}</strong>篇文章（<strong>${response.draftCount}</strong>篇草稿）`)
  }
})

$.ajax({
  url: '/categories/count',
  success: function (response) {
    $('#listTwo').html(`<strong>${response.categoryCount}</strong>个分类`)
  }
})

$.ajax({
  url: '/comments/count',
  success: function (response) {
    console.log(response)
    $('#listThree').html(`<strong>${response.commentCount}</strong>条评论`)
  }
})