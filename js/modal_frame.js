/**
 * Created by haoran.shu on 2016/3/21.
 */
var ModalFrame = {

    // tips提示框
    tips : function(params){
        var tag = $(params.selector); // 获取指定的节点
        var title = params.title; // 获取提示文本
        if(!title) { // 如果未指定提示文本
            // 暂时不支持,获取input的默认提示文本
            if(tag[0].tagName != "INPUT"){
                title = tag.text();
                if(!title){
                    title = "tips";
                }
            }
        }
        // 替换指定的节点
        tag.replaceWith("<a title='" + title + "'>" + tag.prop('outerHTML') + "</a>");
    },
    // 对话框
    dialog : function(params){
        var theme = 0; // 主题样式
        var tag = $(params.id); // 获取指定的需要弹出的对话框层
        if(params.hasOwnProperty("theme")){
            theme = params.theme;
        }
        if(tag){
            var contentTag = $(tag.children("div")[0]); // 里层内容部分
            // 判断是否使用默认的系统样式
            if(theme == 0){ // 加载默认的样式
                tag.addClass("modal_frame_dialog_bg");
                contentTag.addClass("modal_frame_dialog_container");
            }
            if(params.hasOwnProperty("style")){ // 判断是否设置了样式参数
                contentTag.css(params.style);
            }
            // 点击事件
            tag.on("click", function(){
                tag.css("display", "none"); // 点击外面关闭弹出框
            });
            contentTag.on("click", function(){
                event.cancelBubble = true; // 拦截事件,不继续传递事件
            });

            tag.css("display", "flex"); // 显示弹出框
        }
    },
    // 关不对话框
    close: function (id) {
        $(id).css("display", "none");
    }
};
