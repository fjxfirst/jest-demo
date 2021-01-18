import axios from 'axios';
export const runCallback = (callback) => {
    callback('abc');
};
export const createObj = (classItem)=>{
    new classItem();
};
export const getData=()=>{
    return axios.get('/api');
}
