var canvas = document.getElementById("canvas");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
//使canvas自适应屏幕
var ctx = canvas.getContext("2d");
//填充的颜色
ctx.fillStyle = "black";
//边框
ctx.strokeStyle = "none";
//用来标记的变量，当鼠标按下时为true，松开时为false
var flag = false;
//记录鼠标之前的位置的数组
var position = [0, 0];
//线的宽度
ctx.lineWidth = 5;
//连接的方式
ctx.lineCap = "round";//线与线之间用圆连接
//通过判断ontouchstart来判断时移动端还是PC端，当时在移动端的时候监听一些事件，当在PC端的时候监听一些事件
if ("ontouchstart" in document.documentElement) {
//监听手指按下的事件
  canvas.ontouchstart = function (e) {
//记录手按下时的位置
    position[0] = e.touches[0].clientX;
    position[1] = e.touches[0].clientY;
  };
  canvas.ontouchmove = function (e) {
//调用draw函数来画，函数最后面有写
    draw(position[0], position[1], e.touches[0].clientX, e.touches[0].clientY);
    position[0] = e.touches[0].clientX;
    position[1] = e.touches[0].clientY;
  };
} else {
//如果不是移动端的话，监听这些属性
  canvas.onmousedown = function (e) {
//当鼠标按下的时候flag为true，然后记录位置
    flag = true;
    position[0] = e.clientX;
    position[1] = e.clientY;
  };

  canvas.onmousemove = function (e) {
    if (flag) {
//画线，然后记录位置
      draw(position[0], position[1], e.clientX, e.clientY);
      position[0] = e.clientX;
      position[1] = e.clientY;
    }
  };
  canvas.onmouseup = function () {
//鼠标松开后flag为false
    flag = false;
  };
}
//画线的函数
function draw(starX, starY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(starX, starY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  ctx.stroke();
}