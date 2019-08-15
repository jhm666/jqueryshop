$('#file').on('change', function () {
  var formData = new FormData();
  formData.append('image', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#images').val(response[0].image)
    }
  })
})

$('#slidesForm').on('submit', function () {
  var formData = $(this).serialize()
  $.ajax({
    type: 'post',
    url: '/slides',
    data: formData,
    success: function (response) {
      location.reload()
    }
  })
  return false;
})

$.ajax({
  type: 'get',
  url: '/slides',
  success: function (response) {
    var html = template('slidesTpl', { data: response });
    $('#tb').html(html);
  }
})

$('#tb').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  if (confirm('您确定要删除吗?')) {
    $.ajax({
      type: 'delete',
      url: '/slides/' + id,
      success: function () {
        location.reload()
      }
    })
  }
})