/* 防止全局变量作用域的污染 */
(function () {
  /* 运用css选择器获取DOM元素 */
  var aLi = document.querySelectorAll('.wrap ul li'),
      oImg = document.querySelector('.wrap .img'),
      oShow = document.querySelector('.wrap .img .show');
  /* 常用变量 */
  var len = aLi.length,
      index = 0;
  /*ES6的写法，使其有块级作用域，变量值会被保存起来*/
  /*for(let i = 0;i < len; i++){
    aLi[i].onmouseenter = function () {
      aLi[index].className = '';
      index = i;
      aLi[index].className = 'on';
    }
  }*/
  /*闭包的写法:(1)使用波浪线~（2）使用（）;使其变成自执行函数
  * 内部变量引用外部变量，这样外部变量就不会被清理掉 */
  /*for(var i = 0;i < len; i++){
    ~function (j) {
      aLi[j].onmouseenter = function () {
        aLi[index].className = '';
        index = j;
        aLi[index].className = 'on';
      }
    }(i);
  }*/
  /* 存储下标的方法 */
  for(var i = 0;i < len; i++){
    aLi[i].index = i;
    aLi[i].onmouseenter = function () {
      aLi[index].classList.remove('on');
      index = this.index;
      aLi[index].classList.add('on');
      /*行内的样式，因此是加在index.html里面的，故路径是相对于html自身去找的而不用../images*/
      oImg.style.backgroundImage = 'url("images/big'+(index + 1)+'.jpg")';
      oShow.style.backgroundImage = 'url("images/big'+(index + 1)+'.jpg")';
    }
  }
  var oDiv,
      oDivWidth,
      oDivHeight,
      oImgWidth = oImg.clientWidth,
      oImgHeight = oImg.clientHeight,
      oShowWidth,
      oShowHeight;
  oImg.onmouseenter = function () {
    oDiv = document.createElement("div");
    oDiv.className = 'mir';
    oImg.appendChild(oDiv);

    oDivWidth = oDiv.clientWidth;/*这个宽度是width + padding*/
    oDivHeight = oDiv.clientHeight;

    oShow.style.display = 'block';
    oShowWidth = oShow.clientWidth;
    oShowHeight = oShow.clientHeight;
  }
  oImg.onmousemove = function (e) {
    /*为了兼容IE浏览器*/
    var e = e || window.event;

    var x = e.clientX,
        y = e.clientY,
       newLeft = x - oDivWidth/2,
       newTop = y - oDivHeight/2,
       maxLeft = oImgWidth - oDivWidth,
       maxTop = oImgHeight - oDivHeight,
    /*使用Math.max来获取到最大或者最小值*/
    /*newLeft = newLeft > maxLeft ? maxLeft : newLeft;
    newTop = newTop > maxTop ? maxTop : newTop;*/
    newLeft = Math.min(newLeft, maxLeft);
    newLeft = Math.max(newLeft, 0);
    
    newTop = Math.min(newTop, maxTop);
    newTop = Math.max(newTop, 0);

    oDiv.style.left = newLeft + 'px';
    oDiv.style.top = newTop + 'px';

    oShowLeft = newLeft/maxLeft * 100;
    oShowTop = newTop/maxTop * 100;
    oShow.style.backgroundPosition = oShowLeft + '% ' + oShowTop + '%';/*这个是关键点*/

    oShowSize = (oShowWidth * oImgWidth)/oDivWidth;
    oShow.style.backgroundSize = oShowSize + 'px';/*等比放大*/
  }
  oImg.onmouseleave = function () {
    oImg.removeChild(oDiv);
    oShow.style.display = 'none';
  }

})();