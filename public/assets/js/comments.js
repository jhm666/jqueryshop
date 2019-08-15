$.ajax({
  url: '/comments',
  success: function (response) {
    var html = template('commentsTpl', response)
    $('#tb').html(html)
    var pageHtml = template('pageTpl', response)
    $('.pagination').html(pageHtml)
  }
})

// 渲染

function changePage(page) {
  $.ajax({
    url: '/comments',
    data: {
      page: page
    },
    success: function (response) {
      var html = template('commentsTpl', response)
      $('#tb').html(html)
      var pageHtml = template('pageTpl', response)
      $('.pagination').html(pageHtml)
    }
  })
}

//删除
$('#tb').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  if(confirm('您确认要删除吗?')){
    $.ajax({
      type: 'delete',
      url: '/comments/' + id,
      success: function () {
        location.reload()
      }
    })
  }
})

// 批准 驳回
$('#tb').on('click', '.status', function(){
  var status = $(this).attr('data-state')
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',
    url: '/comments/' + id,
    data: {
      state: status == 1 ? 0 : 1
    },
    success: function(response){
      location.reload()
    }
  })
})