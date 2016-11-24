
# React_Test
https://github.com/GodssL/React_Test.git
## 参考网址
[React 官方文档](https://facebook.github.io/react/docs/getting-started.html)

[Node 4.x 官方文档](https://nodejs.org/dist/latest-v4.x/docs/api/)

[Webpack 官方文档](https://webpack.github.io/docs/)

## node 笔记
### 安装: 

到官网下载linux版. 解压缩到home里面, 这里分全局安装和本地安装, 我个人认为还是全局安装比较合适. 通过下面两句设置全局

``` sh
$ ln -s /home/gssl/node/bin/node /usr/local/bin/node 
$ ln -s /home/gssl/node/bin/npm /usr/local/bin/npm 
```
设置完上面两个之后控制台运行node -v和npm -v分别会有相应的版本信息显示.

为什么要装到全局呢? 那是因为node作为服务器应该是放在系统中运行的. 但是如果是定制浏览器或者为其写一个shell的话可能就需要设置成本地了

设置环境变量 (在Centos7上设不设置都一样)
```sh
$ export PATH=”$HOME/node/bin:$PATH” 
$ export NODE_PATH="$HOME/node/lib/node_modules"
```
第一个是node的路径, 第二个是node的模块的路径

### 关于node的认识
node是运行在服务器端的, node由两部分组成, 核心的node服务器和node的模块, 我们可以通过加入自己喜欢的模块到node, 如果每个项目都需要用到的模块, 我们可以通过
```sh
$ npm -g install 模块名
```
来实现全局安装, 如果只有局部项目用到的模块, 我们可以在项目的目录下执行
```sh
$ npm -p install 模块名 
```
来为安装局部的模块. 为了git方便, 我自己是把项目用到的模块都install到项目目录了~

###npm的使用

到项目的目录下执行(我是在项目的sever端)
```sh
$ npm init 
```
然后会让你填写很多东西, 比较重要的是main, 服务端程序的入口.

执行之后在项目的目录下会自动生成package.json

然后可以通过
```sh
$ npm -p install 模块名 --save|--save-dev
```
来安装本地模块了. 如果想在当前项目安装npm支持, 可以先定位到项目根目录, 通过
```sh
$ npm init # 填写package.json信息
```

然后就可以直接安装项目需要的模块了
```sh
$ npm install 模块名 --save|--save-dev
```

这样会定位的项目目录下新建一个node_modules, 新安装的模块都在这里

### webpack 

推荐为每个项目单独安装webpack
```sh
$ npm init # 填写package.json信息
$ npm install webpack --save-dev # 官网推荐用save-dev, 可以保存安装信息到node的json里面
```

如果想用dev-tool则执行
```sh
$ npm install webpack-dev-server --save-dev
```

到这里很多人都是直接就运行webpack了~ 但是我运行webpack却报:
```sh
bash: webpack: 未找到命令... 
```
看了很多加全剧啊之类的, 都不行, 最后在webstorm上发现了node_modules文件夹下有一个.bin的隐藏文件夹, 里面躺着我亲爱的webstorm.... 当即键入:
```sh
$ node_modules/.bin/webpack 
```
成功了~~!!! 泪奔....然后跟着官网走就好了.
####2016-11-24 -- 其实webpack可以装到全局的啦~ 
首先按照上面的步骤把node和npm设置到全局. 然后在全局安装webpack
```sh
$ npm -g install webpack --save-dev
```
然后在node的bin文件夹里面就会多了一个webpack的快捷方式了, 然后按照把node和npm设置到全局的方法设置webpack就好了.

##webpack 笔记
[参考网址](https://webpack.github.io/docs/usage.html)
### 第一种打包方式
```sh
$ node_modules/.bin/webpack ./app.js app.bundle.js # 我的webpack路径比较长...
$ node app.bundle.js
```
其中app.js是程序入口, 可以理解为main函数, app.bundle.js就是打包好的程序了, 如果是C#的话相当于编译后的DLL文件. 整个编译的过程就是webpack通过程序入口`app.js`, 不断地迭代找到此程序依赖的所有包, 然后把这些包一起打包到`app.bundle.js`. 这样我们只需要运行这个"编译"好的包就好了
### 第二种打包方式
通过webpack.config.js打包, 在package.json同级新建一个webpack.config.js文件, 写入下面的内容
```js
module.exports = {
    entry: "./src/app.js", //程序入口
    output: { // 编译后的文件
        path: "./bin",
        filename: "app.bundle.js"
    }
};
```
然后只需要执行
```sh
$ node_modules/.bin/webpack 
$ node app.bundle.js
```
就好了

###使用loaders

因为webpack只支持JavaScript的打包, loader的作用主要是把其他资源转化为javascript. 比如babel-loader通过Babel加载ES2015文件, 先安装Babel和presets
```sh
$ npm install --save-dev babel-core babel-preset-es2015
```
然后安装babel-loader
```sh
$ npm install --save-dev babel-loader
```
然后新增.babelrc文件, 写入:
```js
{ "presets": [ "es2015" ] }
```
webpack.config.js改成
```js
 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }
```

##React 笔记

###[参考网址1(这个网站的demo有问题): ](http://www.cnblogs.com/yunfeifei/p/4486125.html)

1. React不是一个新的模板语言, JSX只是一个表象, 没有JSX的React也能工作. (那么这个东西是不是js? 能兼容js的一些框架吗?)
2. 尽管每一次都需要构造完整的虚拟DOM树, 但是因为虚拟DOM是内存数据, 性能是极高的, 而对实际DOM进行操作的仅仅是Diff部分, 因而能达到提高性能的目的. (相当于每次更新数据都需要刷新一次虚拟的页面, 然后框架做差异更新, )
3. 在保证性能的同时, 开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的DOM元素, 而只需要关心在任意一个数据状态下, 整个界面是如何Render的. (JQ是基于事件+ajax. React是基于状态迁移? 那么数据如何提交呢?)
4. React推荐以组件的方式去重新思考UI构成, 将UI上每一个功能相对独立的模块定义成组件, 然后将小的组件通过组合或者嵌套的方式构成大的组件, 最终完成整体UI的构建。(每个组件如何耦合(如何表达包含关系)? 复用性如何表达? 组件内部的结构是基于一套独立的MVC?)

###[参考网址2(大环境)](http://www.ruanyifeng.com/blog/2015/02/future-of-dom.html)

1. 将整个网站用canvas输出! 如果将网页变成了一个个canvas, 用户就等于在跟图片互动, 这样就绕开了DOM, 降低了操作时滞. 而且, canvas可以被硬件加速, 这样就提高了性能. [技术原文](http://engineering.flipboard.com/2015/02/mobile-web/).
2. 在[Radical-Statements-about-the-Mobile-Web](http://jlongster.com/Radical-Statements-about-the-Mobile-Web)一文中, James Long对未来的Web app提出了几点预测, 我认为很值得分享. 
* 多线程浏览器. 每个网页应该由多个线程进行处理, 主线程只负责布局和渲染, 而且应该在16毫秒内完成, JavaScript由worker线程执行, 这样就不会发生堵塞了. Mozilla正在开发的Servo就是这样一个项目. (这种模式下该如何操作DOM呢?)
* DOM的异步操作. JavaScript对DOM的操作不再是同步的, 而是触发后, 交给Event Loop机制进行监听. (把事件作为新的线程分离)
* 非DOM方案. 浏览器不再将网页处理成DOM结构, 而是变为其他结构. React的Virtual DOM方案就是这一类的尝试, 还有更激进的方案, 比如用数据库取代DOM. (React的方向)

###[ReactJS 官方文档(getting-started)](https://facebook.github.io/react/docs/getting-started.html)

1. 调用的时候script标签要加type="text/babel".
2. 能分离JS
3. ReactDOM.render()的特性: 1. ReactDOM只能操作容器内的节点. 2. 返回了一个刚插入的 JS原生的 Element对象. 3. 如果两个都加载在同一个容器里面的话, 默认后面的覆盖前面的
4. 能跟NPM等打包工具连用

