//添加用户
$('#userForm').on('submit', function () {
  var fromData = $(this).serialize() //serialize()  jquery的方法 将表单里的数据自动拼接成字符串格式
  $.ajax({
    type: 'post',
    url: '/users',
    data: fromData,  // data 可以接收 ?a=1&b=2   这种格式的数据
    success: function () {
      location.reload()
    },
    error: function () {
      alert('添加失败')
    }
  })
  return false;  // 阻止默认提交行为
})
//头像
$('#modifyBox').on('change', '#avatar', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false, // 告诉$.ajax方法不要解析请求参数
    contentType: false, // 告诉$.ajax方法不要设置请求参数的类型
    success: function (response) {
      $('#preview').attr('src', response[0].avatar)
      $('#hiddenAvatar').val(response[0].avatar)
    }
  })
})
//渲染数据
$.ajax({
  type: 'get',
  url: '/users',
  success: function (response) {
    var html = template('userTpl', { data: response })
    $('#tb').html(html)
  }
})

$('#tb').on('click', '#bianji', function () {
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',
    url: '/users/' + id,
    success: function (response) {
      var html = template('modifyTpl', response)
      $('.col-md-4').html(html)
    }
  })
})
//修改用户
$('#modifyBox').on('submit', '#modifyForm', function () {
  var fromData = $(this).serialize() //serialize()  jquery的方法 将表单里的数据自动拼接成字符串
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',
    url: '/users/' + id,
    data: fromData,
    success: function () {
      location.reload()
    },
    error: function () {
      alert(111)
    }
  })
  return false // 阻止默认提交行为
})
//删除用户
$('#tb').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  if (confirm('您确认要删除吗?')) {
    $.ajax({
      type: 'delete',
      url: '/users/' + id,
      success: function () {
        location.reload()
      }
    })
  }
})
//批量删除
$('#remove').on('change',function(){
  var checked = $(this).prop('checked')
  if(checked){
    $('.deleteAll').show()
  }else{
    $('.deleteAll').hide()
  }
  $('#tb').find('input').prop('checked', checked)
})

$('#tb').on('change','#check',function(){
  var inputs = $('#tb').find('input')
  $('#remove').prop('checked',inputs.length == inputs.filter(':checked').length)
  if(inputs.filter(':checked').length > 0){
    $('.deleteAll').show()
  }else{
    $('.deleteAll').hide()
  }
})

$('.deleteAll').on('click',function(){
  var ids = [];
  var checkedUser = $('#tb').find('input').filter(':checked')
  checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));
  });
  // console.log(ids.join('-'))
  if(confirm('您确认要批量删除吗?')){
    $.ajax({
      type: 'delete',
      url: '/users/' + ids.join('-'),
      success: function(){
        location.reload()
      },
      error: function(){
        alert('批量删除失败')
      }
    })
  }
})