/**
 * 弹出框实现
 * Created by haoran.shu on 2016/3/21.
 */
var ModalFrame = {
    // 对话框
    dialog : function(params){
        var tag = $(params.content); // 获取指定的需要弹出的对话框层
        if(tag){
            // 点击事件
            tag.find('.main').on('click', function(){
            	tag.find("input").val(""); // 清空所有输入的内容
                tag.css('display', 'none'); // 点击外面关闭弹出框
            });
            tag.find('.child').on('click', function(){
                event.cancelBubble = true; // 拦截事件,不继续传递事件
            });
            // 如果指定了绑定取消按钮
            if(params.cancelButton){
                // 取消 -- 隐藏当前弹出框
                tag.find(params.cancelButton).on('click', function(){
                	tag.find("input").val(""); // 清空所有输入的内容
                    tag.css('display', 'none');
                });
            }
            // 如果指定了,初始化显示更改
            if(params.initShow){
                // 遍历设置的更改
                for(var i in params.initShow){
                    var item = params.initShow[i];
                    // 遍历JSON获取,key -- value
                    for(var key in item){
                        var t = $(key);
                        if(t){
                            if(t[0].tagName == 'INPUT'){
                                $(key).val(item[key]);
                            } else {
                                $(key).text(item[key]);
                            }
                        }
                    }
                }
            }
            tag.css('display', 'block'); // 显示弹出框
        }
        return tag;
    },
    // alert
    alert: function(params){
        var tag = document.getElementById("modal_frame_alert");
        if(!tag){
            // 构造html节点
            var h = "<div class='shade'></div>" +
                "<div class='main'><div class='section'><div class='child'><div class='content'>" +
                "<p id='alert_tips' style='font-weight:bold'>ModalFrame</p>" +
                "<button class='modal_frame_button'>确定</button></div></div></div></div>";
            var divt = document.createElement("div"); // 创建节点
            divt.id = "modal_frame_alert"; // 为节点设置id
            divt.className = "modal_frame_dialog_box"; // 增加样式表
            divt.innerHTML = h; // 添加子节点信息
            document.body.appendChild(divt); // 将节点添加到body
            tag = document.getElementById("modal_frame_alert");
            tag.getElementsByClassName("main")[0].onclick = function(){
                tag.style.display = "none";
            }; // 点击外部区域,隐藏对话框
            tag.getElementsByTagName("button")[0].onclick = function () {
                tag.style.display = "none";
            }; // 点击确定按钮后隐藏对话框
        }
        if(params.content){ // 设置显示内容
            tag.getElementsByTagName("p")[0].innerText = params.content;
        }
        tag.style.display = "block";
    },
    // 加载框
    loading : function (params) {
        var tag = document.getElementById("modal_frame_loading");
        if(!tag){
            // 构造html节点
            var h = "<div class='shade'></div>" +
                "<div class='main'><div class='section'><div class='child' style='background: none;box-shadow:none;min-width:50px'>" +
                "<div class='circle_loading_frames'></div></div></div></div>";
            var divt = document.createElement("div"); // 创建节点
            divt.id = "modal_frame_loading"; // 为节点设置id
            divt.className = "modal_frame_dialog_box"; // 增加样式表
            divt.innerHTML = h; // 添加子节点信息
            document.body.appendChild(divt); // 将节点添加到body
            tag = document.getElementById("modal_frame_loading");
            if(params.shadeCancel){
                tag.getElementsByClassName("main")[0].onclick = function(){
                    // ModalFrame.this.remove("modal_frame_loading");
                    document.body.removeChild(tag); // 删除节点信息
                }; // 点击外部区域,隐藏对话框
            }
        }
        tag.style.display = "block";
        return "modal_frame_loading"; // 返回加载层的id
    },
    // 关不对话框
    close: function (id) {
        $(id).css('display', 'none');
    },
    // 关闭整个页面所有的对话框,必须的设置 'class=modal_frame' 的对话框才支持
    closeAll: function () {
        $('.modal_frame').css('display', 'none');
    },
    remove: function(id){
        console.log("remove : " + id);
        var dele = document.getElementById(id);
        console.log(dele.tagName);
        if(dele){
            document.body.removeChild(dele); // 删除节点信息
        }
    }

};
