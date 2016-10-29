that.$element.children().eq(0).css("position", "absolute").css({
    "margin":"0px",
    "top": function () {
        return (that.$element.height() - that.$element.children().eq(0).height()-40) / 2 + "px";
    },
    "left": function () {
        return (that.$element.width() - that.$element.children().eq(0).width()) / 2 + "px";
    }
});