function createChart() {
  let cInfo = ["Cultural"];
  let eInfo = ["Economic"];
  let pInfo = ["Political"];
  let counry = countryList[countryList.length - 1];

  if (counry["IsFill"]) {
    if (counry["Cultural Information"].length > 1) {
      for (let i = 1; i < counry["Cultural Information"].length; i++) {
        cInfo.push(counry["Cultural Information"][i].rating);
      }
    }

    if (counry["Economic Information"].length > 1) {
      for (let i = 1; i < counry["Economic Information"].length; i++) {
        eInfo.push(counry["Economic Information"][i].rating);
      }
    }

    if (counry["Political Information"].length > 1) {
      for (let i = 1; i < counry["Political Information"].length; i++) {
        pInfo.push(counry["Political Information"][i].rating);
      }
    }
  }

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [cInfo, eInfo, pInfo]
    }
  });
}
