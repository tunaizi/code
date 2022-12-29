function animate(ele, attr, end, aniType, fn) {
  // var cur = ele.offsetTop;   //快捷取值 不能适用于所有的
  var cur = parseFloat(getStyle(ele, attr)); //取整
  // 1000   "1000px"
  var end = parseFloat(end); // 555     cur:550  => 560

  // 加速运动 初始速度 + 每隔一段时间增加一定的值 (v = v0 + at)
  var speed = 0;

  clearInterval(ele.timer); // 防止连续点击
  // ele  当前运动的元素  => 元素节点(本质是 对象)  => 可以自定义属性
  ele.timer = setInterval(function () {
    if (aniType == 'normal') {
      // 匀速运动
      speed = end >= cur ? 40 : -40;
    } else if (aniType == 'fast') {
      // 加速运动
      // 正向允许  速度speed++
      // 反向允许  速度speed--
      speed = end >= cur ? speed + 10 : speed - 10;
      // console.log(speed);
    } else if (aniType == 'lower') {
      // 减速运动
      // 按照物理来说  ele有一定的初识速度  缓慢减速,终点刚好为0
      // 0  => 100,200,300,400  =>终点不同,起始速度也不同  (可以反推但是太麻烦)
      // => 缓冲运动

      // 缓冲运动(每次走剩余的n分之一    n缓冲因子)
      // 缓冲因子  => 一般在8-12之间

      // 正向运动   0-1000   speed => 无限接近0的正数   =>向上取整
      // speed = (end - cur) / 2;
      // console.log(speed);
      // speed = Math.ceil(speed);

      // 反向运动   1000-0   speed => 无限接近0的负数  => 向下取整
      // speed = (end - cur) / 2;
      // console.log(speed);
      // speed = Math.floor(speed);

      speed = (end - cur) / 10;
      speed = speed >= 0 ? Math.ceil(speed) : Math.floor(speed);
    }

    // 开始运动(自增)
    cur += speed; //每次运动的当前值

    // cur == end     理想情况
    // 正向运动  0-1000   cur>=end
    // 反向运动  1000-0   cur<=end

    ele.style[attr] = cur + 'px';

    // 终点值 /  临界值
    if (Math.abs(end - cur) <= Math.abs(speed)) {
      ele.style[attr] = end + 'px';
      clearInterval(ele.timer);

      if (fn) {
        // 在运动结束之后  如果存在回调函数fn  则调用该函数
        fn();
      }
    }
  }, 20);
}

function getStyle(ele, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele)[attr];
  } else {
    return ele.currentStyle[attr];
  }
}

// 1. 匀速  之 正向运动  和 反向运动
// 2. 匀速  之 正向运动  和 反向运动 => 封装函数   animate(ele,end)
// 3. 匀速  之 正向运动  和 反向运动 => 封装函数  => 多属性 animate(ele,attr,end)
// 4. 匀速  之 正向运动  和 反向运动 => 封装函数  => 多属性 animate(ele,attr,end)  => 加速/缓冲 =>  animate(ele,attr,end,aniType)
// 5. 匀速  之 正向运动  和 反向运动 => 封装函数  => 多属性 animate(ele,attr,end)  => 加速/缓冲 =>  animate(ele,attr,end,aniType)  => 链式运动  animate(ele,attr,end,aniType,fn)
// 6. 匀速  之 正向运动  和 反向运动 => 封装函数  => 多属性 animate(ele,attr,end)  => 加速/缓冲 =>  animate(ele,attr,end,aniType)  => 链式运动  animate(ele,attr,end,aniType,fn)  => 多元素运动  ele.timer  (给每一个运动的元素绑定一个timer属性)
