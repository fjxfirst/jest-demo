import axios from 'axios';
// export const fetchData=(fn)=>{
//     axios.get('http://localhost:3001/agents/1')
//     .then((response)=>{
//        console.log(response);
//        fn(response.data);
//     }).catch(e=>{
//        console.log(e);
//     })
// }
export const fetchData=()=>{
   return axios.get('http://localhost:3001/2')
}