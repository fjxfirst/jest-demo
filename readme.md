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

## 快照测试

项目中经常有一些配置文件。比如

```javascript
export const generateConfig  = () => {
    return {
        server: 'http://localhost',
        port: '8080'
    }
}
```

那测试它的测试用例可以这样写

```javascript
test('测试 generateConfig函数', () => {
    expect(generateConfig()).toMatchSnapshot();
});
```

这样当配置文件中的配置项增加的时候，就不需要更新测试用例了。它会在第一次执行用例后生成一个**快照**。这个快照文件会自动放在\_\_snapshots\_\_目录下。之后每次测试都会和第一次的快照做对比，如果不一样则会报测试不通过。这种形式很适合测试配置文件。

但是如果确实要更新配置文件的话，也可以更新快照。

按照命令行提示按w键，再按u键进行更新，如果有多个快照需要更新的话按i键进入交互模式，以此进行确认再按u键进行更新。

### 如果配置项存在不确定值

```javascript
export const generateConfig = () => {
    return {
        server: 'http://localhost',
        port: 8080,
        time: new Date() // 不确定值
    };
};
```

那么测试用例就需要使用expect.any（类型）

```javascript
test('测试 generateConfig函数', () => {
    expect(generateConfig()).toMatchSnapshot({
        time:expect.any(Date) // Date类型
    });
});
```

### 行内快照

先安装prettier

```bash
npm install prettier
```

把toMatchSnapshot改成toMatchInlineSnapshot

```javascript
test("测试 generateAnotherConfig函数", () => {
  expect(generateAnotherConfig()).toMatchInlineSnapshot();
});
```

再次重新执行npm run test后，该测试用例的快照会生成在toMatchInlineSnapshot的参数中

```javascript
generateAnotherConfig = () => {
    return {
        server: 'http://localhost',
        port: 8080,
        time: '2019'
    };
};
test("测试 generateAnotherConfig函数", () => {
    expect(generateAnotherConfig()).toMatchInlineSnapshot(`
    Object {
      "port": 8080,
      "server": "http://localhost",
      "time": "2019",
    }
  `);
});
```

## mock深入

模拟方法，可以在目录下建一个文件夹\__mocks\_\_，在这个文件夹下面新建一个文件，这个文件的名字跟真实方法存在的文件的文件名一样。然后再编写用例时，在用例文件顶部写jest.mock('./demo')，在测试时会找到模拟的方法，而不是真实的文件中的方法。

```javascript
jest.mock('./demo'); // 模拟demo
import {fetchData} from './demo';
test('fetchData 测试', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123');
    });
});
```

也可以修改配置jest.config.js中的automock为true，这样就不用再测试文件中写jest.mock()了

```javascript
module.exports = {
    automock: true, // 自动开启jest.mock()
    clearMocks: true
}
```

但是存在使用一部分真实的方法，这种情况下

```javascript
jest.mock('./demo'); // 模拟demo
import {fetchData} from './demo'; //使用的是__mocks__文件夹下面的模拟的方法
const {getNumber}=jest.requireActual('./demo'); //使用的是真实的文件中的方法
test('fetchData 测试', () => {
    return fetchData().then(data => { // fetachData是模拟的
        expect(eval(data)).toEqual('123');
    });
});
test('getNumber 测试', () => { // getNumber是真实的
    expect(getNumber()).toEqual(123);
});
```

## mock timers

让时间快进，测试事件定时器中的函数

```javascript
const timer = (callback) => {
    setTimeout(() => {
        callback();
        setTimeout(() => {
            callback();
        }, 3000);
    }, 3000);
}

beforeEach(()=>{//因为每个测试用例中都有执行advanceTimersByTime，会对下一个测试用例造成影响，所以再每次执行测试用例之前都去重新清零一下时间来消除影响
    jest.useFakeTimers();
});

test('timer 测试', () => {
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000); // 快进3秒
    expect(fn).toHaveBeenCalledTimes(1); // 是否执行了1次
    jest.advanceTimersByTime(3000); // 在上次的基础上再快进3秒，此处为6秒了
    expect(fn).toHaveBeenCalledTimes(2); // 是否执行了2次
});
test('timer 测试2', () => {
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000); // 如果在此之前没有执行jest.useFakeTimers()，那么时间会累计，所以要使用beforeEach，再次执行一下
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(fn).toHaveBeenCalledTimes(2);
});
```

## mock模拟类

util.js

```javascript
// 如果去测试一个真实的类的话是没有必要的，很耗费性能和时间
class Util {
    a() {
        // ...非常复杂
    }
    
    b() {
        // ...非常复杂
    }
}
export default Util;
```

demo.js

```javascript
export const demoFunction = (a,b)=>{
    const util=new Util();
    util.a(a); // 没必要真实的执行实例上的方法，浪费性能
    util.b(b);
}
```

util.test.js

```javascript
import {expect} from '@jest/globals';

/*jest.mock方法util是一个类，会自动把类的构造函数和方法变成jest.fn()
这样demoFunction中用到的Util就是模拟的Util了
也可以在__mocks__文件夹下面进行模拟*/
jest.mock('./util');
// 还有一种方式是，在jest.mock的第二个参数中进行设置
/*jest.mock('./util',()=>{
    const Util=jest.fn(()=>{
        console.log('constructor');
    });
    Util.prototype.a=jest.fn(()=>{
        console.log('a');
    })
    Util.prototype.b=jest.fn(()=>{
        console.log('b');
    })
})*/
import {demoFunction} from './demo';

import Util from './util';
test('测试 demoFunction 方法',() =>{
    demoFunction();
    expect(Util).toHaveBeenCalled(); // 断言类的构造函数已执行
    expect(Util.mock.instances[0].a).toHaveBeenCalled(); // a方法已执行
    expect(Util.mock.instances[0].a).toHaveBeenCalled(); // b方法已执行
})
```

## 测试dom操作

先安装jquery

```bash
npm install jquery
```

dom.js

```javascript
import $ from 'jquery'
const addDivToBody=()=>{
    $('body').append('<div/>')
}
export default addDivToBody
```

dom.test.js

```javascript
import addDivToBody from './dom';
import $ from 'jquery'

test('测试 addDivToBody',()=>{
    addDivToBody();
    expect($('body').find('div').length).toBe(1);
})
//node不具备dom
//jest在node环境下自己模拟了一套dom的api， jsdom
//所以可以使用dom操作的api
```

