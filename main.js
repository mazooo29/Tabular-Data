let api_url = 'https://jsonplaceholder.typicode.com/users';
let data;
let usersArray = [];
function getData(){
    return fetch(api_url)
    .then((response) => {
        return response.json();
    }).then((data)=> {
        usersArray = data;
        return data;}); 
    
}
async function buildTable(result = []){
    let placeholder = document.getElementById("data-output");
    let out="";
    for(let info of result){
        let {id,name,username,email,address: {street,suite,city,zipcode,geo:{lat,lng}},phone,website,company:{name:n,catchPhrase:cp,bs}} = info
        out+=`
            <tr class="trClass">
            <td>${id}</td>
            <td>${name}</td>
            <td>${username}</td>
            <td>${email}</td>
            <td>${street},${suite},${city},${zipcode},${lat},${lng}</td>
            <td>${phone}</td>
            <td>${website}</td>
            <td>${n},${cp},${bs}</td>
            </tr>
        `;  
    }
    placeholder.innerHTML = out;
}
$('#nameId').on('click',async function(){
    let order = $(this).data('order');
    let arrow = $(this).html();
    console.log(order, arrow)
    arrow = arrow.substring(0, arrow.length - 1);
    if(order == 'desc'){
        $(this).data('order',"asc");
        usersArray = usersArray.sort((a, b) => (a.name > b.name ? 1 : -1));
        arrow+=' &#9660;';
    }else if(order =='asc'){
        $(this).data('order',"desc");
        usersArray = usersArray.sort((a, b) => (a.name > b.name ? -1 : 1));
        arrow+=' &#9650;';
    }
    $(this).html(arrow);
    buildTable(usersArray);
});
$('#search-input').on('keyup',async function(){
    let value = $(this).val(); 
    let result = searchTable(value);
    return  buildTable(result);
})
function searchTable(value){
    let filteredData = [];
    for(let i=0;i<usersArray.length;i++){
        value = value.toLowerCase();
        let name = usersArray[i].name.toLowerCase();
        let address = `${usersArray[i].address.street.toLowerCase()}, ${usersArray[i].address.suite.toLowerCase()}, ${usersArray[i].address.city.toLowerCase()}, ${usersArray[i].address.zipcode.toLowerCase()}, ${usersArray[i].address.geo.lat.toLowerCase()}, ${usersArray[i].address.geo.lng.toLowerCase()}`;
        let company = `${usersArray[i].company.name.toLowerCase()}, ${usersArray[i].company.catchPhrase.toLowerCase()}, ${usersArray[i].company.bs.toLowerCase()}`;
        if(address.includes(value) || company.includes(value) || name.includes(value)){
            filteredData.push(usersArray[i]);
        }
    }
    return filteredData;
}
function tLC(ele){
    return ele.toLowerCase();
}
$( document ).ready(async function() {
    result = await getData();
    await buildTable(result);
})