const axios = require('axios');

axios.get('http://localhost:3001/2').catch(e=>{
    console.log(e);
})