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
        let {id,name,username,email,phone,address:{street,suite,city,zipcode,geo:{lat,lng}},website,company:{name:n,catchPhrase:cp,bs}} = info;
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
    let add,comp;
            usersArray.filter((info) => {
                let {address:{street,suite,city,zipcode,geo:{lat,lng}},company:{name:n,catchPhrase:cp,bs}} = info;
                let val = tLC(value);
                add = `${tLC(street)},${tLC(suite)},${tLC(city)},${tLC(zipcode)},${tLC(lat)},${tLC(lng)}`;
                comp = `${tLC(n)},${tLC(cp)},${tLC(bs)}`;
                return  add.includes(val) ? filteredData.push(info) :
                        comp.includes(val)? filteredData.push(info):false;
            });
    return filteredData;
}
function tLC(ele){
    return ele.toLowerCase();
}
$( document ).ready(async function() {
    result = await getData();
    await buildTable(result);
})