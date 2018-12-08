function pushData(fc, sc, info) {
  let fb = firebase.database();

  fb.ref()
    .child(fc)
    .child(sc)
    .child("events")
    .set(info);
  
  fb.ref()
    .child(fc)
    .child(sc)
    .child("IsFill")
    .set(true);

  fb.ref()
    .child(sc)
    .child(fc)
    .child("events")
    .set(info);
  
  fb.ref()
    .child(sc)
    .child(fc)
    .child("IsFill")
    .set(true);
}

function getData(fc, sc) {
  return firebase
    .database()
    .ref()
    .child(fc)
    .child(sc)
    .once("value")
    .then(function(snap) {
      let offset = snap.val();

      countryList.push(offset);
      countryList[countryList.length - 1].firstCountry = fc;
      countryList[countryList.length - 1].secondCountry = sc;

      if (!countryList[countryList.length - 1]["IsFill"]) {
        let submit = confirm("Fill information about this country?");

        if (submit) {
          mapApp.contacts_seen = true;
          mapApp.request_contact_seen = true;
          noFill = true;
        }
      }
    });
}

function takeInfo() {
  let CI, CR, CY, ER, PR, CM;

  CI = document.getElementById("CII").value;
  CY = document.getElementById("CY").value;
  ER = document.getElementById("ERI").value;
  CM = document.getElementById("CM").value;
  CR = document.getElementById("CRI").value;
  PR = document.getElementById("PRI").value;

  mapApp.contacts_seen = false;
  mapApp.request_contact_seen = false;

  let info = {
    info: CI,
    politicalRating: PR,
    culturalRating: CR,
    economicRating: ER,
    date: { CM, CY }
  };
  
  countryList[countryList.length - 1]["events"].push(info);

  pushData(
    countryList[countryList.length - 1].firstCountry,
    countryList[countryList.length - 1].secondCountry,
    countryList[countryList.length - 1]["events"]
  );

  createChart();

  noFill = false;
  CI = "";
  CM = "";
  CY = "";
  CR = 0;
  ER = 0;
  PR = 0;
}

function takeCustomInfo() {
  let CI, CR, CY, ER, PR, FC, SC, CM, bg, cf;

  

  FC = document.getElementById("CFCI").value;
  SC = document.getElementById("CSCI").value;
  CI = document.getElementById("CCII").value;
  CR = document.getElementById("CCRI").value;
  CY = document.getElementById("CCY").value;
  CM = document.getElementById("CCM").value;
  ER = document.getElementById("CERI").value;
  PR = document.getElementById("CPRI").value;

  mapApp.contacts_seen = false;
  mapApp.custom_contact_seen = false;

  return firebase
    .database()
    .ref()
    .child(FC)
    .child(SC)
    .once("value")
    .then(function(snap) {
      let offset = snap.val();

      countryList.push(offset);
      countryList[countryList.length - 1].firstCountry = FC;
      countryList[countryList.length - 1].secondCountry = SC;

        let info = {
          info: CI,
          politicalRating: PR,
          culturalRating: CR,
          economicRating: ER,
          date: { CM, CY }
        };

      countryList[countryList.length - 1]["events"].push(info);

      pushData(
        countryList[countryList.length - 1].firstCountry,
        countryList[countryList.length - 1].secondCountry,
        countryList[countryList.length - 1]["events"]
      );

      createChart();

      noFill = false;
      CI = "";
      CY = "";
      CM = "";
      CR = 0;
      ER = 0;
      PR = 0;
    });
}

function showCustomForm() {
  mapApp.contacts_seen = true;
  mapApp.custom_contact_seen = true;
}

function signIn() {
  let email = document.getElementById("input_email").value;
  let password = document.getElementById("input_password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      mapApp.login_seen = false;
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    });
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}
