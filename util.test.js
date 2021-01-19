import {expect} from '@jest/globals';

jest.mock('./util');
// jest.mock方法util是一个类，会自动把类的构造函数和方法变成jest.fn()
// 这样demoFunction中用到的Util就是模拟的Util了
// 也可以在__mocks__文件夹下面进行模拟
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
    expect(Util).toHaveBeenCalled();
    expect(Util.mock.instances[0].a).toHaveBeenCalled();
    expect(Util.mock.instances[0].a).toHaveBeenCalled();
})
