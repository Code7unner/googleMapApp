let database;
let ref;

let CI, CR, EI, ER, PI, PR;

let arrOfInfoTags = ["CI", "CR", "EI", "ER", "PI", "PR"];

function pushData(fc, sc) {

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


//TODO
function getData(fc, sc){ 
    
    firebase.database().
    ref().
    child(fc).
    child(sc).
    on("value", function(snap) { 
        console.log("1[")
        let offset = snap.val();
        countryList.push(offset); 
        countryList[countryList.length - 1].firstCountry = fc;
        countryList[countryList.length - 1].secondCountry = sc;
        console.log("xw[")
        if(!countryList[countryList.length - 1]["IsFill"]){
            let submit = confirm("Fill information about this country?");
    
            if (submit) {
                let inputInfo = document.getElementById('inputInfo');
    
                for (let i = 0; i < arrOfInfoTags.length; i++) {
                    $('<input>').attr({
                        type: 'text',
                        id: 'infoForm' + arrOfInfoTags[i],
                    }).appendTo(inputInfo);
                }
            }
        }
        return "done"
    });

    //Dialog window (no , yes{ open form (onSubmit pushData and close form)})
    
}

function errData(err) {

    console.log('Error!');
    console.log(err);

}