import axios from 'axios';

// 用这个假的替代真的
export const fetchData = () => {
    // 假设后端返回 (function(){return '123'})()
    return new Promise(((resolve, reject) => {
        resolve("(function(){return '123'})()")
    }))
};
