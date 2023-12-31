async function executeRequest() {
    var request = {};
    const fields = document.querySelectorAll('#fieldsCatch input');
    fields.forEach(elem => {
       request[elem.name] = elem.value; 
    });
    const endpoint = '../../../api/'+getobj('endpoint').value;
    fetchTable('fieldsCatch', endpoint, request, 25)
    .then(reply => {
        console.log(reply);
    })
}