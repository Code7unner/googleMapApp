function createChart() {
  let chartPlace = document.getElementById("chart");
  let cInfo = ["Cultural"];
  let eInfo = ["Economic"];
  let pInfo = ["Political"];
  let country = countryList[countryList.length - 1];
  let years = ['x'];

  if (country["IsFill"]) {
    if (country["Cultural Information"].length > 1) {
      for (let i = 1; i < country["Cultural Information"].length; i++) {
        cInfo.push(country["Cultural Information"][i].rating);
        years.push(country["Cultural Information"][i].year);
      }
    }

    if (country["Economic Information"].length > 1) {
      for (let i = 1; i < country["Economic Information"].length; i++) {
        eInfo.push(country["Economic Information"][i].rating);
        years.push(country["Economic Information"][i].year);
      }
    }

    if (country["Political Information"].length > 1) {
      for (let i = 1; i < country["Political Information"].length; i++) {
        pInfo.push(country["Political Information"][i].rating);
        years.push(country["Political Information"][i].year);
      }
    }
  }
  chartPlace.style.display = "block";

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [cInfo, eInfo, pInfo]
    }
  });
}
