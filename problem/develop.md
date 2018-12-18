## 日常开发
...

## 移动端唤起数字键盘，只可输入数字

**需求：** 移动端唤起数字键盘，只可输入数字，过滤特殊符号，限制长度

**问题：** 
- 使用 `<input type="number">` 安卓可输入`+-.e`特殊符号；
- 当输入这些特殊符号时，value值为空；
- `maxlength`属性无效
- ios不会唤起数字键盘

**解决：**
- 使用 `<input type="tel">` 输入特殊字符value不会为空，监听事件替换特殊字符；
- `maxlength`属性有效
- `<input type="number" pattern="[0-9]*">` 利用 `pattern` ios可以唤起数字键盘

**例子**

```
// html
<input type="tel" v-model="phone" @input="filterNumber" maxlength="11" pattern="[0-9]*" />

// js
filterNumber (e) {
    this.phone = this.phone.split('').filter( (item,index) => {
        return /^[0-9]*$/.test(item);
    }).join('');
},
```
