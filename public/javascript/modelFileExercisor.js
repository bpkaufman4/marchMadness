async function executeRequest() {
    var request = {};
    const fields = document.querySelectorAll('#fieldsCatch input');
    fields.forEach(elem => {
       request[elem.name] = elem.value; 
    });
    const endpoint = getobj('endpoint').value;
    loadTable('fieldsCatch', endpoint, request, 25)
    .then(reply => {
        console.log(reply);
    })
}