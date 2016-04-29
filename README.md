# ModalFrame
javascript弹出框插件,依赖于jquery。
## 实现内容
### alert(用于替换原生js的alert)
```javascript
ModalFrame.alert({content:"test"});
```
参数content为需要显示的内容
### loading(加载对话框)
```javascript
ModalFrame.loading({shadowCancel : true}); // 弹出加载框
```
参数shadowCancel为是否允许点击阴影区域,结束对话框,默认为false。
### 普通的对话框
普通的对话框,使用比较烦琐，但可扩展性强,并且不会用js频繁操作dom,耗费性能。
```javascript
  // 1.定义节点
  <div id="dg" class="modal_frame_dialog_box" style="display: none">
        <!-- 遮罩层 -->
        <div class="shade"></div>
        <!-- 主体层 -->
        <div class="main">
            <!-- 内容区域实现,单元格[实现内容垂直居中] -->
            <div class="section">
                <!-- 实现弹出框的宽度,并且水平居中 -->
                <div class="child">
                    <!-- 标题 -->
                    <h3 class="title">信息提示</h3>
                    <!-- 主体内容部分 -->
                    <div class="content">
                        <button id="btn_cancel">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    // 其中content里面就是需要补充的显示的内容部分,其它部分为主体部分,样式已经定义好了，当然也可以手动定义样式。
  
  // 2.弹出对话框
  ModalFrame.dialog({
    content : "#dg", // 需要弹出的对话框的id
    cancelButton : "button", // 绑定取消按钮,自动实现点击该按钮后,隐藏对话框
    initShow : [{
      "#name" : "lisi",
      "#password" : "123456"
    }] // 显示的时候,用于初始化显示的内容,会自动判断'#name' -- 选择器, 'lisi' -- 初始化的值
        // 会自动判断给定的选择器如果是input,则更新value值,否则更新text()值。
  });
```
这个可能要麻烦一点,可能有人会问了,既然明知道要麻烦一点,并且很多都是通用的,为什么不直接一次性封装好,实现简单调用呢？其实也想过封装好，直接调用，但是考虑到两个问题，暂时就没有一次性封装好
  <br/>  1.扩展性,这样虽然麻烦一点,但是样式可以手动扩展，只需要重写样式就行了，可扩展性强
   <br/>  2.对话框关闭的时候其实只是设置了display:none，并没有真正意义上的从dom上移除,当然如果需要移除,也可以调用remove()方法来实现手动从dom节点上移除，如果每一次关闭都移除，就会导致频繁的对dom节点进行侵入操作，会消耗性能
  <br/>   3.我看过很多的插件都是通过把要显示的内容的节点内容(outerHTML)获取到,然后手动的在body里面插入节点标签，将重复的内置的样式插入进去，然后把获取的outerHTML内置就去，这样就能实现每次关闭的时候都移除对话框节点，但是这样会导致频繁操作dom不说，还有一个问题就是如果我需要id去操作弹出框的一些节点时，就会出现页面上原节点有该id,对话框上也有该id,会出现重复id的情况，而这时候，只能通过其它选择器来获取节点了，而我们都知道js通过id获取其实是最快的操作。
