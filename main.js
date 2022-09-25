let api_url = 'https://jsonplaceholder.typicode.com/users';
let myArray=[];
console.log(myArray);
let data;
let result;
function getData(){
    return fetch(api_url)
    .then((response) => {
        myArray = response.json();
        return myArray;
    }); 
}
console.log(myArray)
// second way
// async function getDataMain(){
//     let meta = await fetch(api_url);
//     return meta.json()
// }
async function buildTable(result = []){
    let placeholder = document.querySelector("#data-output");
    let out="";
    placeholder.innerHTML = '';
    if(result.length == 0){
        let myArray = await getData();
        for(let info of myArray){
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
    }else{
        for(let info of result){
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
    }
    
    placeholder.innerHTML = out;
}
buildTable();
$('#nameId').on('click',async function(){
    let order = $(this).data('order');
    let arrow = $(this).html();
    arrow = arrow.substring(0, arrow.length -1);
    myArray = await getData();
    if(order == 'normal'){
        $(this).data('order',"desc");
        myArray = myArray.sort((a, b) => (a.name > b.name ? 1 : 1));
        arrow='Name ';
        
    }else if(order == 'desc'){
        $(this).data('order',"asc");
        myArray = myArray.sort((a, b) => (a.name > b.name ? 1 : -1));
        arrow+=' &#9660;';
    }else if(order =='asc'){
        $(this).data('order',"normal");
        myArray = myArray.sort((a, b) => (a.name > b.name ? -1 : 1));
        arrow+=' &#9650;';
    }
    $(this).html(arrow);
    buildTable(myArray);
});
$('#search-input').on('keyup',async function(){
    let value = $(this).val(); 
    let info = await getData();
    let result = searchTable(value,info);
    return  buildTable(result);
})
function searchTable(value,data){
    let filteredData = [];
    for(let i=0;i<data.length;i++){
        value = value.toLowerCase();
        let name = data[i].name.toLowerCase();
        let address = `${data[i].address.street.toLowerCase()}, ${data[i].address.suite.toLowerCase()}, ${data[i].address.city.toLowerCase()}, ${data[i].address.zipcode.toLowerCase()}, ${data[i].address.geo.lat.toLowerCase()}, ${data[i].address.geo.lng.toLowerCase()}`;
        let company = `${data[i].company.name.toLowerCase()}, ${data[i].company.catchPhrase.toLowerCase()}, ${data[i].company.bs.toLowerCase()}`;
        if(address.includes(value) || company.includes(value) || name.includes(value)){
            filteredData.push(data[i]);
            console.log(filteredData);
        }
    }
    return filteredData;
}


