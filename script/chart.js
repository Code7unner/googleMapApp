function createChart(id) {
  let elemId = "chart" + id;
  let butId = "chartDisplayButton" + id;
  let chartPlace = document.getElementById(elemId);
  let but = document.getElementById(butId);
  let cInfo = ["Cultural"];
  let eInfo = ["Economic"];
  let pInfo = ["Political"];
  let dates = ['x', '2017-01-01', '2017-02-02', '2017-03-03', '2017-04-04', '2017-05-05', '2017-06-06', '2017-07-07', '2017-08-08', '2017-09-09', '2017-10-10', '2017-11-11', '2017-12-12',
                    '2018-01-01', '2018-02-02', '2018-03-03', '2018-04-04', '2018-05-05', '2018-06-06', '2018-07-07', '2018-08-08', '2018-09-09', '2018-10-10', '2018-11-11', '2018-12-12',
                    '2019-01-01', '2019-02-02', '2019-03-03', '2019-04-04', '2019-05-05', '2019-06-06', '2019-07-07', '2019-08-08', '2019-09-09', '2019-10-10', '2019-11-11', '2019-12-12']

                  
  let country = countryList[id];
  let cScore = 0;
  let eScore = 0;
  let pScore = 0;


  if (country["IsFill"]) {
    for (let i = 0; i < 36; i++){
        if (eScore > 0) eScore--; else if (eScore < 0) eScore++; 
        if (pScore > 0) pScore--; else if (pScore < 0) pScore++;
        if (cScore > 0) cScore--; else if (cScore < 0) cScore++;

        for (let j = 1; j < country["events"].length; j++){
          if((+country["events"][j].date.CY % 2017) * 12 + 
              +country["events"][j].date.CM - 1 == i){
                cScore += +country["events"][j].culturalRating;
                pScore += +country["events"][j].politicalRating;
                eScore += +country["events"][j].economicRating;       
              }         
        }
        cInfo.push(cScore);
        pInfo.push(pScore);
        eInfo.push(eScore);
        
    }
  }
  // todo scale offset []
  chartPlace.style.display = "block";
  but.style.display = "none";
  map.setCenter(new google.maps.LatLng(infoWindow.position.lat() , infoWindow.position.lng()))

  let bindID = "#" + elemId;

  var chart = c3.generate({
    bindto: bindID,
    data: {
      x: 'x',
      columns: [dates, cInfo, eInfo, pInfo]
    },
    axis: {
      x: {
          type: 'timeseries',
          tick: {
              format: '%m.%Y'
          }
      }
  }
  });
}
