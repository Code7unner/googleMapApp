let database;
let ref;

let data = {
    amount: null,
    economic: null,
    culture: null
};

let amountValue = document.getElementById("amountValue");
let economicValue = document.getElementById("economicValue");
let cultureValue = document.getElementById("cultureValue");

//Init database
database = firebase.database();
ref = database.ref(`inputInfo`);

function pushData() {

    const amountToSave = amountValue.value;
    const economicToSave = economicValue.value;
    const cultureToSave = cultureValue.value;

    data = {
        amount: amountToSave,
        economic: economicToSave,
        culture: cultureToSave
    };

    ref.push(data);

}

//Press key "Search"
$("#startValue").on('keydown',function(event){
    if (event.keyCode === 13) {
        pushData();
    }
});

$("#pushValue").click(function() {
    pushData();
});

//TODO
//Add getData into ref.on();
ref.on('value', errData);

function getData() {

    // let inputInfoList;
    //
    // inputInfoList = selectAll('.inputInfoListing');
    //
    // for (let i = 0; i < inputInfoList.length; i++) {
    //     inputInfoList[i].remove();
    // }

}

function errData(err) {

    console.log('Error!');
    console.log(err);

}