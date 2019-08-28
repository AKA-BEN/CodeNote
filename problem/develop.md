# 填坑总结
...

## 移动端唤起数字键盘，只可输入数字

**需求：** 移动端唤起数字键盘，只可输入数字，过滤特殊符号，限制长度

**问题：** 
- 使用 `<input type="number">` 安卓可输入`+-.e`特殊符号；
- 当输入这些特殊符号时，value值为空；
- `maxlength`属性无效
- ios不会唤起数字键盘

**解决：**
- 使用 `<input type="tel">` 输入特殊字符value不会为空，使用事件或`watch`监听替换特殊字符；
- `maxlength`属性有效
- `<input type="number" pattern="[0-9]*">` 利用 `pattern` ios可以唤起数字键盘

**例子**

```
// html
<input type="tel" v-model="phone" @keyup="inputLocation" maxlength="11" pattern="[0-9]*" />

// js
watch: {
    phone (newVal, oldVal) {
        if (!/^[0-9]*$/.test(newVal)) {
            this.phone = newVal.replace(/[^0-9]*/g, '')
        }
    }
},
methods: {
    /**
    *   Q: 当输入【】‘’等符号，被替换掉后光标会前移一位
    *   A: 被替换掉后，光标定位到最后一位
    **/
    inputLocation (event) {
        if (!/^[0-9]*$/.test(newVal)) {
            let el = event.target;
            el.setSelectionRange(el.value.length, el.value.length);
        }
    }
}
```
