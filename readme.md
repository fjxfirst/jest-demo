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

## mock的使用

1. 捕获函数的调用和返回结果，以及this和调用顺序
2. 它可以让我们自由的设置返回结果
3. 改变函数的内部实现

当需要获知函数是否被调用、函数的调用次数时，可以使用jest.fn()

```javascript
runCallback = (callback) => {
    callback('abc');
};
test('测试runcallback', () => {
    const func = jest.fn(); //mock函数，捕获函数的调用
    runCallback(func);
    runCallback(func);
    runCallback(func);
    expect(func.mock.calls[0]).toEqual(['abc']); // 函数func接收的参数是否为'abc'
    expect(func.mock.calls.length).toBe(3); //函数func是否调用了3次
    expect(func).toBeCalled();//函数func是否被调用了
});
```

模拟返回值，方式一

```javascript
test('测试runcallback', () => {
    const func = jest.fn(()=>{
        return 100;
    }); //可以往fn中传入一个函数，这个函数的返回值就是func的返回值
    runCallback(func);
    console.log(func.mock);
});
```

模拟返回值，方式二

```javascript
test('测试runcallback返回值', () => {
    const func = jest.fn(); //mock函数，捕获函数的调用
    func.mockReturnValueOnce('hello'); //设置第一次的返回值
    func.mockReturnValueOnce('tom');//设置第二次的返回值
    func.mockReturnValueOnce('bob');//设置第三次的返回值
    // 也可以链式调用
    /*func.mockReturnValueOnce('hello')
        .mockReturnValueOnce('tom')
        .mockReturnValueOnce('bob');*/
    // func.mockReturnValue('dell') 设置每次调用的返回值
    runCallback(func);
    runCallback(func);
    runCallback(func);
    console.log(func.mock);
});
```

模拟函数底层运行逻辑

```javascript
const func = jest.fn(); //mock函数，捕获函数的调用
func.mockImplementation((arg)=>{ //模拟函数底层运行逻辑
    console.log(arg); // arg为调用func时传入的参数
    return 'hello'
});
runCallback(func);
expect(func).toBeCalledWith('abc') // 判断是否以参数'abc'来调用函数的
```

改变函数的内部实现

```javascript
const getData=()=>{
    return axios.get('/api');
}
jest.mock('axios');
test('测试getData',async ()=>{
    // 改变函数的内部实现
    // axios.get.mockResolvedValueOnce({data:'hello'}); //只模拟一次
    axios.get.mockResolvedValue({data:'hello'});
    await getData().then(data=>{
        expect(data.data).toBe('hello')
    })
})
```

