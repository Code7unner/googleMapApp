let database;
let ref;

function pushData(fc, sc, CI, CR, EI, ER, PI, PR) {

    let fb = firebase.database();

    fb.ref().child(fc).child(sc).child("Cultural Information").set(CI);
    fb.ref().child(fc).child(sc).child("Cultural Rating").set(CR);
    fb.ref().child(fc).child(sc).child("Economic Information").set(EI);
    fb.ref().child(fc).child(sc).child("Economic Rating").set(ER);
    fb.ref().child(fc).child(sc).child("Political Information").set(PI);
    fb.ref().child(fc).child(sc).child("Political Rating").set(PR);
    fb.ref().child(fc).child(sc).child("IsFill").set(true);


    fb.ref().child(sc).child(fc).child("Cultural Information").set(CI);
    fb.ref().child(sc).child(fc).child("Cultural Rating").set(CR);
    fb.ref().child(sc).child(fc).child("Economic Information").set(EI);
    fb.ref().child(sc).child(fc).child("Economic Rating").set(ER);
    fb.ref().child(sc).child(fc).child("Political Information").set(PI);
    fb.ref().child(sc).child(fc).child("Political Rating").set(PR);
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
            }
        }
    });   
}

function takeInfo(){
    let CI, CR, EI, ER, PI, PR;

    CI = document.getElementById('CII').value;
    CR = document.getElementById('CRI').value;
    EI = document.getElementById('EII').value;
    ER = document.getElementById('ERI').value;
    PI = document.getElementById('PII').value;
    PR = document.getElementById('PRI').value;

    pushData(countryList[countryList.length - 1].firstCountry,
            countryList[countryList.length - 1].secondCountry,
            CI, CR, EI, ER, PI, PR)

    let backGround = document.getElementById('backgroundContact');
    backGround.style.display = "None";

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