export default  fetch(
         `http://localhost:5000`,
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
             console.log('result',result);
             return result.data.data.recordset;
         })
    .catch(error => console.log(error))