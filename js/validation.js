let isUpdate = false;
let addressBookObj = {};
window.addEventListener('DOMContentLoaded', (event) =>{
    const name = document.querySelector("#name");
    const textError = document.querySelector(".name-error");
    name.addEventListener('input',function(){
        if( name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;

        }
});

const address = document.querySelector("#address");
    const addressError = document.querySelector(".address-error");
    address.addEventListener('input',function(){
        if( address.value.length == 0){
            addressError.textContent = "";
            return;
        }
        try{
            (new AddressBookData()).address = address.value;
            addressError.textContent = "";
        }catch(e){
            addressError.textContent = e;

        }
});

const zip = document.querySelector("#zip");
    const zipError = document.querySelector(".zip-error");
    zip.addEventListener('input',function(){
        if( zip.value.length == 0){
            zipError.textContent = "";
            return;
        }
        try{
            (new AddressBookData()).zip = zip.value;
            zipError.textContent = "";
        }catch(e){
            zipError.textContent = e;

        }
});

const phone = document.querySelector("#phone");
    const phoneError = document.querySelector(".phone-error");
    phone.addEventListener('input',function(){
        if( phone.value.length == 0){
            phoneError.textContent = "";
            return;
        }
        try{
            (new AddressBookData()).phone = phone.value;
            phoneError.textContent = "";
        }catch(e){
            phoneError.textContent = e;

        }
});

checkForUpdate();

});

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setAddressBookSystemObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("../html/addressBook_record.html");
        // window.location.replace(site_properties.home_page);
        // window.location.replace(site_properties.home_page);
        // let employeePayRollData = createEmployeePayroll();
        // createAndUpdateStoragef(employeePayRollData);
    }catch(e){
        return;
    }   
}

const setAddressBookSystemObj = () =>{
    addressBookObj._name = getInputValueById("#name");
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._stateSelect = getInputValueById('#stateSelect');
    addressBookObj._citySelect = getInputValueById('#citySelect');
    addressBookObj._zip= getInputValueById('#zip');
    addressBookObj._phone = getInputValueById('#phone');
}

const  createAndUpdateStorage = () =>{
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

    if(addressBookList){
        let addressBookData = addressBookList.find(empData => empData._id == addressBookObj._id);
        if(!addressBookData){
            addressBookList.push(createAddressBookData());
        }else{
            const index = addressBookList.map(empData => empData._id).indexOf(addressBookData._id);
            addressBookList.splice(index,1, createAddressBookData(addressBookData._id));
        }
    }
    else{
        addressBookList = [createAddressBookData()];
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if(!id) addressBookData.id = createNewAddressBookId();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const setAddressBookData = (addressBookData) => {
    try{
        addressBookData.name = addressBookObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    addressBookData.address = addressBookObj._address;
    addressBookData.stateSelect = addressBookObj._stateSelect;
    addressBookData.citySelect = addressBookObj._citySelect;
    addressBookData.zip = addressBookObj._zip;
    addressBookData.phone = addressBookObj._phone;   
    alert(addressBookData.toString());
}
const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach( item =>{
        if(item.checked){
            setItems.push(item.value);
        }
    });
    return setItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () =>{
    setValue("#name","");
    setTextValue('.name-error', '');
    setTextValue('.phone-error', '');
    setValue('#address','');
    setValue('#state','Choose State');
    setSelectedIndex('#citySelect',0);
    setValue('#zip','');
    setValue('#phone','');
}
const unSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setValue = (id, value) =>{
    var element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

// function createAndUpdateStorage(addressBookData){
//     let addressBookList = JSON.parse(localStorage.getItem("addressBookList"));

//     if(addressBookList != undefined){
//         addressBookList.push(addressBookData);
//     }
//     else{
//         addressBookList = [addressBookData];
//     }
//     // alert(addressBookList.toString());
//     localStorage.setItem("addressBookList", JSON.stringify(addressBookList));
//     location.href="../html/addressBook_record.html";
// }

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createNewAddressBookId = () => {
    let empID = localStorage.getItem("AddressID");
    empID = !empID ? 1 : ( parseInt(empID)+1).toString();
    localStorage.setItem("AddressID", empID);
    return empID;
}

const checkForUpdate = () =>{
    const addressBookJson = localStorage.getItem("editAdb");
    isUpdate = addressBookJson ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#address', addressBookObj._address);
    setValue('#stateSelect', addressBookObj._stateSelect);
    setValue('#citySelect', addressBookObj._citySelect);
    setValue('#zip', addressBookObj._zip);
    setValue('#phone', addressBookObj._phone);
    setCity(addressBookObj._stateSelect,"#citySelect",addressBookObj._citySelect);
}

const setCity = (stateValue, selector, value) => {
    makeSubmenu(stateValue);
    const element = document.querySelector(selector);
    element.value = value;
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if( item.value === value){
            item.checked = true;
        }
    });
}
const remove = (node) => {
    let perAddressBookData = addressBookList.find(empData => empData._id == node.id);
    if( !perAddressBookData) return;
    const index = addressBookList.map(empData => empData._id).indexOf(perAddressBookData._id);
    addressBookList.splice(index,1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    document.querySelector(".emp-count").textContent = addressBookList.length;
    createInnerHtml();
}


const update = (node) => {
    let addressBookData = addressBookList.find(empData => empData._id == node.id);
    if(!addressBookData){return;}
    localStorage.setItem("editAdb", JSON.stringify(addressBookData))
    window.location.replace(site_properties.add_emp_payroll_page);
}



// const setValue = (id, value) =>{
//     var element = document.querySelector(id);
//     element.value = value;
// }

// const setTextValue = (id, value) =>{
//     const element = document.querySelector(id);
//     element.textContent = value;
// }


