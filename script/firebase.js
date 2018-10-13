let database;
let ref;

function pushData(fc, sc, CI, EI, PI) {

    let fb = firebase.database();

    fb.ref().child(fc).child(sc).child("Cultural Information").set(CI);
    fb.ref().child(fc).child(sc).child("Economic Information").set(EI);
    fb.ref().child(fc).child(sc).child("Political Information").set(PI);
    fb.ref().child(fc).child(sc).child("IsFill").set(true);


    fb.ref().child(sc).child(fc).child("Cultural Information").set(CI);
    fb.ref().child(sc).child(fc).child("Economic Information").set(EI);
    fb.ref().child(sc).child(fc).child("Political Information").set(PI);
    fb.ref().child(sc).child(fc).child("IsFill").set(true);
}


function getData(fc, sc){

    return firebase.database().
    ref().
    child(fc).
    child(sc).
    once("value").then(function (snap) {

        let offset = snap.val();
        
        countryList.push(offset); 
        countryList[countryList.length - 1].firstCountry = fc;
        countryList[countryList.length - 1].secondCountry = sc;

        if(!countryList[countryList.length - 1]["IsFill"]) {

            let submit = confirm("Fill information about this country?");
    
            if (submit) {

                let inputForm = document.getElementById('contact');
                let backGround = document.getElementById('backgroundContact');
                backGround.style.display = "block";
                noFill = true;
            }
        }
    });   
}

function takeInfo(){
    let CI, CR, EI, ER, PI, PR
    let innerText = document.getElementById('outputInfo');

    CI = document.getElementById('CII').value;
    CR = document.getElementById('CRI').value;
    CY = document.getElementById('CYI').value;
    EI = document.getElementById('EII').value;
    ER = document.getElementById('ERI').value;
    EY = document.getElementById('EYI').value;
    PI = document.getElementById('PII').value;
    PR = document.getElementById('PRI').value;
    PY = document.getElementById('PYI').value;


    
    let backGround = document.getElementById('backgroundContact');
    backGround.style.display = "None";

    let temp = {
        info: " ",
        rating: 0,
        year: 0
    }
    temp.info = CI;
    temp.rating = CR;
    temp.year = CY
    countryList[countryList.length - 1]["Cultural Information"].push(temp);

    temp.info = EI;
    temp.rating = ER;
    temp.year = EY;
    countryList[countryList.length - 1]["Economic Information"].push(temp)

    temp.info = PI;
    temp.info = PR;
    temp.year = PY;
    countryList[countryList.length - 1]["Political Information"].push(temp);


    pushData(countryList[countryList.length - 1].firstCountry,
            countryList[countryList.length - 1].secondCountry,
            countryList[countryList.length - 1]["Cultural Information"],
            countryList[countryList.length - 1]["Economic Information"],
            countryList[countryList.length - 1]["Political Information"]);


    let innerText = document.getElementById('outputInfo').value;

    innerText+= countryList[countryList.length - 1]["Cultural Information"];
    innerText+= countryList[countryList.length - 1]["Economic Information"];
    innerText+= countryList[countryList.length - 1]["Political Information"];

    noFill = false;
    CI = '';
    EI = '';
    PI = '';
    CR =  1;
    ER =  1;
    PR =  1;
}

function errData(err) {

    console.log('Error!');
    console.log(err);

}