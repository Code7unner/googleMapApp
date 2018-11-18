function createChart() {
  let chartPlace = document.getElementById("chart");
  let cInfo = ["Cultural"];
  let eInfo = ["Economic"];
  let pInfo = ["Political"];
  let dates = ["x", "01.17", "02.17", "03.17", "04.17", "05.17", "06.17", "07.17", "08.17", "09.17", "10.17", "11.17", "12.17",
                    "01.18", "02.18", "03.18", "04.18", "05.18", "06.18", "07.18", "08.18", "09.18", "10.18", "11.18", "12.18",
                    "01.19", "02.19", "03.19", "04.19", "05.19", "06.19", "07.19", "08.19", "09.19", "10.19", "11.19", "12.19"]
  let country = countryList[countryList.length - 1];
  let cScore = 0;
  let eScore = 0;
  let pScore = 0;


  if (country["IsFill"]) {
    for (let i = 0; i < 35; i++){
        if (eScore > 0) eScore--; else if (eScore < 0) eScore++; 
        if (pScore > 0) pScore--; else if (pScore < 0) pScore++;
        if (cScore > 0) cScore--; else if (cScore < 0) cScore++;

        for (let j = 1; j < country.length; j++){
          if((+country[j].date[1] % 2017) * 12 + 
              +country[j].date[0] - 1 == i)
                cScore += +country[j].culturalRating;
                pScore += +country[j].politicalRating;
                eScore += +country[j].economicRating;
        }

        cInfo.push(cScore);
        pInfo.push(pScore);
        eInfo.push(eScore);
    }
  }
  chartPlace.style.display = "block";

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      x: 'x',
      columns: [dates, cInfo, eInfo, pInfo]
    }
  });
}
