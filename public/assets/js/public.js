// 页面加载进度条
NProgress.start()
window.onload = function () {
  NProgress.done()
}

// template.render() 公共模板
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    var randerTpl = `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>
    {{/each}}
    `
    var html = template.render(randerTpl, { data: response })
    $('.random').html(html)
  }
})

$.ajax({
  url: '/categories',
  success: function (response) {
    var topNavTpl = `
    {{each data}}
    <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html = template.render(topNavTpl, { data: response })
    $('.nav').html(html)
    $('#topNavBox').html(html)
  }
})

// 最新评论
$.ajax({
  url: '/comments/lasted',
  success: function (response) {
    console.log(response)
    var commentTpl = `
    {{each data}}
    <li>
      <a href="javascript:;">
        <div class="avatar">
          <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
          <p>
            <span>{{$value.author.nickName}}</span>{{$imports.dateFormate($value.author.createTime)}}说:
          </p>
          <p>{{$value.content}}</p>
        </div>
      </a>
    </li>
    {{/each}}
    `
    var html = template.render(commentTpl, {data: response})
    $('.discuz').html(html)
  }
})
// 格式化时间
function dateFormate(date) {
  date = new Date(date);
  month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
  data = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return date.getFullYear() + '-' + month + '-' + data;
}
// 地址栏请求参数的处理
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  for (var i = 0, len = paramsAry.length; i < len; i++) {
    var temp = paramsAry[i].split('=');
    if (name == temp[0]) {
      return temp[1]
    }
  }
  return -1
}

$('.search form').on('submit', function () {
  var keys = $('.keys').val();
  location.href = `/search.html?key=${keys}`
  return false;
})