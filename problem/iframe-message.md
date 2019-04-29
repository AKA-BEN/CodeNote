# iframe跨域通信

以下所称的的父页面为使用包含iframe的页面，子页面为被包含的iframe页面。  
最近在开发中遇到一个内嵌的iframe子页面需要获取父页面的一些信息的需求，而父子页面是跨域的，无法直接使用 `window.parent` 、 `window.self` 等对象操作对方。  
通过postMessage的方式解决了该问题，以下为父子页面postMessage通信的封装例子。  

**父页面**
```
  <iframe id="child" src="https://www.child.com/postMessage-child.html" frameborder="0"></iframe>
  <script>

    function iframePostMeaasge (elId, callbacks = {}) {
      // 参数判断
      if (!elId) return 'no iframe id param!';
      var el = document.getElementById(elId);
      if (!el) return 'no' + elId + 'iframe!';
      var iframeEl = el.contentWindow;
      // 公共回调函数
      var defaultCallBacks = {
        getScrollTop: function (res) {
          iframeEl.postMessage({
            msgType: 'getScrollTop',
            parentScrollTop: window.scrollY
          }, '*')
        }
      };
      var cb = Object.assign(defaultCallBacks, callbacks);

      // postMessage事件监听
      window.addEventListener('message', function (res) {
        if (res.data.msgType && cb[res.data.msgType]) {
          cb[res.data.msgType](res, iframeEl)
        }
      })
    }

    iframePostMeaasge('child', {
      // 自定义回调
      getSomething (res, iframeEl) {
        iframeEl.postMessage({
          msgType: 'getSomething',
          somedata: 'this is somedata'
        }, '*')
      }
    })
    
  </script>

```

**子页面**
```
  <h1>postmessage-child</h1>
  <button onclick="getScrollTop()">获取滚动高度</button>
  <button onclick="getSomething()">获取某些数据</button>
  <div id="msg"></div>

  <script>
    var elMsg = document.getElementById('msg');

    function iframePostMeaasge (callbacks = {}) {
      // 公共回调函数
      var defaultCallBacks = {
        getScrollTop: function (res) {
          elMsg.innerHTML += 'scrollTop:' + res.data.parentScrollTop + '<br/>'
        }
      };
      var cb = Object.assign(defaultCallBacks, callbacks);

      // postMessage事件监听
      window.addEventListener('message', function (res) {
        if (res.data.msgType && cb[res.data.msgType]) {
          cb[res.data.msgType](res)
        }
      })
    }

    iframePostMeaasge({
      // 自定义回调
      getSomething (res) {
        elMsg.innerHTML += 'somedata:' + res.data.somedata + '<br/>'
      }
    })

    function getScrollTop () {
      window.parent.postMessage({msgType: 'getScrollTop'}, '*')
    }

    function getSomething () {
      window.parent.postMessage({msgType: 'getSomething'}, '*')
    }
  </script>

```
