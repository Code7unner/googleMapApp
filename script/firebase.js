let database;
let ref;

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
    
    firebase.database().ref().child(fc).child(sc).on("value", function(snap) { 
        var offset = snap.val(); 
        countryList.push(offset); 
        countryList[countryList.length - 1].firstCountry = fc;
        countryList[countryList.length - 1].secondCountry = sc;
    });    

    if (countryList[countryList.length - 1]["IsFill"] === undefined){
        //Dialog window (no , yes{ open form (onSubmit pushData and close form)})
    }
}

function errData(err) {

    console.log('Error!');
    console.log(err);

}