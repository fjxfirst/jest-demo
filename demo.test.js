import {getData, runCallback,createObj} from './demo';
import {expect, jest} from '@jest/globals';
import axios from 'axios';
jest.mock('axios');
//1.捕获函数的调用和返回结果，以及this和调用顺序
//2.它可以让我们自由的设置返回结果
//3.改变函数的内部实现
test('测试runcallback', () => {
    const func = jest.fn(); //mock函数，捕获函数的调用
    runCallback(func);
    runCallback(func);
    runCallback(func);
    expect(func.mock.calls[0]).toEqual(['abc']);
    expect(func.mock.calls.length).toBe(3);
    expect(func).toBeCalled();
});
test('测试runcallback返回值', () => {
    const func = jest.fn(); //mock函数，捕获函数的调用
    func.mockImplementation((arg)=>{ //模拟函数底层运行逻辑
        console.log(arg);
        return 'hello'
    });
    // func.mockReturnThis()
    
   /* func.mockReturnValueOnce('hello')
        .mockReturnValueOnce('tom')
        .mockReturnValueOnce('bob');*/
    runCallback(func);
    runCallback(func);
    runCallback(func);
    // console.log(func.mock);
    // expect(func.mock.results[2].value).toBe('bob')
    expect(func).toBeCalledWith('abc')
});
test('测试createObj',()=>{
    const func = jest.fn();
    createObj(func);
    console.log(func.mock);
})
test('测试getData',async ()=>{
    // 改变函数的内部实现
    // axios.get.mockResolvedValueOnce({data:'hello'}); //只模拟一次
    axios.get.mockResolvedValue({data:'hello'});
    await getData().then(data=>{
        expect(data.data).toBe('hello')
    })
})
