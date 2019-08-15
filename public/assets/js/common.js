NProgress.start()
window.onload = function () {
  NProgress.done()
}
$('#logout').on('click', function () {
  if (confirm('你确定要退出吗')) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
  return false;
})

function dateFormate(date) {
  date = new Date(date);
  month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
  data = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return date.getFullYear() + '-' + month + '-' + data;
}

$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response) {
    $('.avatar').prop('src', response.avatar)
    $('.name').html(response.nickName)
  }
})