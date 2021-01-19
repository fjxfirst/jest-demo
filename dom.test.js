import addDivToBody from './dom';
import $ from 'jquery'

test('测试 addDivToBody',()=>{
    addDivToBody();
    expect($('body').find('div').length).toBe(1);
})
//node不具备dom
//jest在node环境下自己模拟了一套dom的api， jsdom
//所以可以使用dom操作的api
