## jest基本配置

使用jest的命令进行初始化

```
npx jest --init
```

根据提示执行完后，会在项目根目录生成jest.config.js

```javascript
module.exports={
	coverageDirectory: "coverage",// 测试报告生成的目录名
}
```

使用babel，让jest能够测试esModule模块的js代码

```
npm i @babel/core @babel/preset-env -D
```

创建文件.babelrc

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

jest内部已经集成了babel-jest插件，会自动检测是否安装了@babel/core,结合babel把代码做了一次转换

## 匹配器

使用--watchAll命令参数开启监听

```javascript
// 浮点小数应使用toBeCloseTo
test('toBeCloseTo', () => {
    const firstNumber = 0.1;
    const secondNumber = 0.2;
    expect(firstNumber + secondNumber).toBeCloseTo(0.3);
});
// 字符串匹配
test('toMatch', () => {
    const str = 'hello tom'
    expect(str).toMatch(/tom/);
});
// Array、Set
test('toContain', () => {
    const arr = ['tom','bob','imooc']
    expect(arr).toContain('bob');
});
//异常情况的匹配器
const throwNewErrorFunc=()=>{
    throw new Error('this is a new Error')
}
test('toThrow', () => {
    expect(throwNewErrorFunc).toThrow('this is a new Error');//也可以是个正则
});
```

## jest命令行工具

Watch Usage

1. › Press f to run only failed tests.

   只会去测试之前跑失败的

2.  › Press o to only run tests related to changed files.

   只会去测试修改过的测试文件，要使用o模式，必须使用git；或者使用--watch默认开启o模式

3. › Press p to filter by a filename regex pattern.

   开启p模式时会让输入文件名，然后匹配对应的文件进行测试

4.  › Press t to filter by a test name regex pattern.

   开启t模式时会让输入测试名，然后匹配对应的测试用例进行测试

5.  › Press q to quit watch mode.按q退出

6.  › Press Enter to trigger a test run.按回车键重新触发测试

## 异步代码的测试

