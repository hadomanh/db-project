export default  fetch(
    `http://localhost:5000/getCart`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }
)
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log("xxx alo lao" + result);
        console.log('dcmm result',result);
        console.log(result.data.data.recordsets[0]);
        return result.data.data.recordsets[0];
    })
.catch(error => console.log(error))