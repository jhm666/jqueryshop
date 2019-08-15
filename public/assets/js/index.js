
$.ajax({
  type: 'get',
  url: '/slides',
  success: function (response) {
    var html = template('asideTpl', { data: response })
    $('#slide').html(html)
    // -----------------------------  轮播图代码  ---------------------------------------------
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;
        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });
    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);
      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    })
  }
})

$.ajax({
  type: 'get',
  url: '/posts/lasted',
  success: function(response){
    var html = template('lastedTpl', {data: response})
    $('#lastedBox').html(html)
  }
})

// 格式化日期
function dateFormate(date) {
  date = new Date(date);
  month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
  data = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return date.getFullYear() + '-' + month + '-' + data;
}

