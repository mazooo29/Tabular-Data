let api_url = 'https://jsonplaceholder.typicode.com/users';
fetch(api_url)
.then(function(response){
    return response.json();
})
.then(function(information){
    let placeholder = document.querySelector("#data-output");
    let out="";
    for(let info of information){
        out+=`
            <tr>
            <td>${info.id}</td>
            <td>${info.name}</td>
            <td>${info.username}</td>
            <td>${info.email}</td>
            <td>${info.address.street},${info.address.suite},${info.address.city},${info.address.zipcode},${info.address.geo.lat},${info.address.geo.lng}</td>
            <td>${info.phone}</td>
            <td>${info.website}</td>
            <td>${info.company.name},${info.company.catchPhrase},${info.company.bs}</td>
            </tr>
        
        `;
    }
    placeholder.innerHTML = out;
})
$(document).ready(function () {

    $('table').bootstrapTable({
    data: mydata
    });
});
