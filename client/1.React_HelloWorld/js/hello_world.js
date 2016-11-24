/**
 * Created by gssl on 16-7-18.
 */
// 3. 如果两个都加载在同一个容器里面的话, 默认后面的覆盖前面的
ReactDOM.render(
    <h1>我来自外部的JS, 吃掉了HELLO WORLD~ :)</h1>,
    document.getElementById('example')
);