import axios from 'axios';
import Util from './util';
export const runCallback = (callback) => {
    callback('abc');
};
export const createObj = (classItem) => {
    new classItem();
};
export const getData = () => {
    return axios.get('/api');
};
export const generateConfig = () => {
    return {
        server: 'http://localhost',
        port: 8080,
        time: new Date()
    };
};
export const generateAnotherConfig = () => {
    return {
        server: 'http://localhost',
        port: 8080,
        time: '2019'
    };
};
export const fetchData = () => {
    // 假设后端返回 (function(){return '123'})()
    return axios.get('/').then(res => res.data);
};
export const getNumber=()=>{
    return 123
}
export const demoFunction = (a,b)=>{
    const util=new Util();
    util.a(a); // 没必要真实的执行实例上的方法，浪费性能
    util.b(b);
}
