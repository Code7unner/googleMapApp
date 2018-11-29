$(document).ready(function() {
  coords.push([]);

  initMap();

  startApp();
});

function findLine(x, y) {
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords[i].length - 1; j++) {
      var a =
        (coords[i][j].Y - coords[i][j + 1].Y) * x +
        (coords[i][j + 1].X - coords[i][j].X) * y +
        (coords[i][j].X * coords[i][j + 1].Y -
          coords[i][j + 1].X * coords[i][j].Y);

      if (a > -0.5 && a < 0.5) {
        let tempArr = [];

        tempArr.push(coords[i][j]);
        tempArr.push(coords[i][j + 1]);

        return tempArr;
      }
    }
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startApp() {
  $("#startValue").on("keydown", function(event) {
    if (event.keyCode === 13) {
      createLine();
      $(this).val("");
      $(this).focus();
    }
  });

  $("#pushValue").click(function() {
    InfoWindow.close();
    createLine();
    $(this).focus();
  });

  $("#newArrow").click(function() {
    coords.push([]);
    myColor = random(0, 4);
    allLengthInMeters = 0;
  });
}

function initMap() {
  allLengthInMeters = 0;

  geocoder = new google.maps.Geocoder();

  let latlng = new google.maps.LatLng(43.119809, 131.886924);
  let mapOptions = {
    zoom: 4,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var result = document.getElementById("result");

  setZoom();
}

function translateToEng(c) {
  for (let i = 0; i < countryArrayRUS.length; i++) {
    if (c == countryArrayRUS[i]) {
      return countryArrayENG[i];
    }
  }
  return c;
}

function evalWeight() {
  let a = countryList[countryList.length - 1];
  let value = 0;
  let count = 0;
  if (a["IsFill"]) {
    if (a["events"].length > 1) {
      for (let i = 1; i < a["events"].length; i++) {
        value += +a["events"][i].culturalRating;
        value += +a["events"][i].economicRating;
        value += +a["events"][i].politicalRating;
        count += 3;
      }
    }
    return value / count;
  } else return 4;
}

function evalColor() {
  let a = countryList[countryList.length - 1];
  let value = 0;
  let count = 0;
  if (a["IsFill"]) {
    if (a["events"].length > 1) {
      for (let i = 1; i < a["events"].length; i++) {
        value += +a["events"][i].culturalRating;
        value += +a["events"][i].economicRating;
        value += +a["events"][i].politicalRating;
        count += 3;
      }
    }

    value = value / count;
    if (value > 0 && value < 2) return myColors[0];
    else if (value > 1.99 && value < 3) return myColors[1];
    else if (value > 2.99 && value < 5.01) return myColors[2];
  } else return myColors[3];
}

function createLine() {
  if (firstAddress == "none"){
    firstAddress = document.getElementById("startValue").value;
  } else if(secondAddress == "none"){
    secondAddress = document.getElementById("startValue").value;
  } else {
    firstAddress = firstAddress = document.getElementById("startValue").value;
    secondAddress = "none"
    polyline.setMap(null);
    infoWindow.close();
  }

  let firstPosXY, secondPosXY;

  geocoder.geocode({ address: firstAddress }, function(results, status) {
    firstPosXY = results[0].geometry.location;
    var fc =
      results[0].address_components[results[0].address_components.length - 1][
        "long_name"
      ];
    fc = translateToEng(fc);

    if (secondAddress != "none") {
      geocoder.geocode({ address: secondAddress }, async function(
        results,
        status
      ) {
        secondPosXY = results[0].geometry.location;
        var sc =
          results[0].address_components[
            results[0].address_components.length - 1
          ]["long_name"];
        sc = translateToEng(sc);
        let lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

        route = [firstPosXY, secondPosXY];

        //Get firstCountry: secondCountry
        getData(fc, sc).then(function() {
          if (!noFill) {
            outputContent = "Information about " + fc + " and " + sc + '\n\n';
            
            outputContent += "          Countries Inforamtion" + '\n\n';
            for (let i = 1; i < countryList[countryList.length - 1]["events"].length; i++ ){
              outputContent += "Date: " + countryList[countryList.length - 1]["events"][i].date.CM + '.' +
                                         countryList[countryList.length - 1]["events"][i].date.CY +'\n' +
                                 "Cultural rating: "   + countryList[countryList.length - 1]["events"][i].culturalRating  + '\n' +                                 
                                 "Economic rating: "   + countryList[countryList.length - 1]["events"][i].economicRating   + '\n' +
                                 
                                 "Political rating: " + countryList[countryList.length - 1]["events"][i].politicalRating + '\n' +
                                 "Info: " + countryList[countryList.length - 1]["events"][i].info + '\n\n';
            }
          } else {
            outputContent = "none"
          }

          polylineOptions = {
            path: route,
            icons: [
              {
                icon: lineSymbol,
                offset: myOffset
              }
            ],

            strokeColor: evalColor(),
            strokeOpacity: myOpacity,
            strokeWeight: evalWeight()
          };

          polyline = new google.maps.Polyline(polylineOptions);
         

          firstLocation = convertLocationToLatLong(firstPosXY.toUrlValue());
          secondLocation = convertLocationToLatLong(secondPosXY.toUrlValue());
          lengthInMeters = Math.round(
            google.maps.geometry.spherical.computeLength(polyline.getPath())
          );
          allLengthInMeters += lengthInMeters;

          polyline.setMap(map);

          //Work with increasing the map
          plotMap(firstLocation, secondLocation);

          let coordinatesArr = polyline.getPath().getArray();

          convertPolylineToJSON(coordinatesArr);

          // Event to create Info-window about the route
          polyline.addListener("click", aboutArrow);
        });
      });

      firstAddress = secondAddress;
    } else {
      firstLocation = convertLocationToLatLong(firstPosXY.toUrlValue());

      plotMap(firstLocation);

      polyline = new google.maps.Polyline(polylineOptions);

      let coordinatesArr = polyline.getPath().getArray();
      convertPolylineToJSON(coordinatesArr);
    }
  });
}

function convertLocationToLatLong(loc) {
  loc = loc.split(",").map(function(item) {
    return parseFloat(item);
  });

  return loc;
}

function plotMap(firstLoc, secondLoc) {
  //Increases current location

  firstLoc = new google.maps.LatLng(firstLoc[0], firstLoc[1]);

  if (secondLoc) {
    secondLoc = new google.maps.LatLng(secondLoc[0], secondLoc[1]);
  }

  let bounds = new google.maps.LatLngBounds();

  bounds.extend(firstLoc);

  if (secondLoc) {
    bounds.extend(secondLoc);
  }

  map.fitBounds(bounds);

  setZoom();
}

function setZoom() {
  google.maps.event.addListener(map, "zoom_changed", function() {
    zoomChangeBoundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      function(event) {
        if (this.getZoom() > 15 && this.initialZoom === true) {
          // Change max/min zoom here
          this.setZoom(15);
          this.initialZoom = false;
        }

        google.maps.event.removeListener(zoomChangeBoundsListener);
      }
    );
  });

  map.initialZoom = true;
}

function aboutArrow(event) {
  if(infoWindow){
    infoWindow.close();
  }
  infoWindow = new google.maps.InfoWindow();

  let j = 0;

  let contentString = "<div id=\"chart\"></div>" + "<button id=\"chartDisplayButton\" onClick = \"createChart(infoWindow)\"> Dispaly chart </button>"  +
                       "<p>___________________________________________________________</p> <br/>"
                      + "<textarea readonly cols=\"50\" rows=\"13\" id=\"outputInfo\"> replacetext </textarea>";
  contentString = contentString.replace(/replacetext/g,  outputContent);
  infoWindow.maxHeight = 500; 
  infoWindow.setContent(contentString);  
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);   
}

function convertPolylineToJSON(coordinatesArr) {
  for (let i = 0; i < coordinatesArr.length; i++) {
    let polylineLat = coordinatesArr[i].lat();
    let polylineLng = coordinatesArr[i].lng();

    let polylineLatLng = new Coord(polylineLat, polylineLng);

    newCoordinatesArr.push(polylineLatLng);
  }

  strCoordinatesPolyline = JSON.stringify(newCoordinatesArr);
  jsonPolyline = '{"coordinates":' + strCoordinatesPolyline + ":";

  console.log(jsonPolyline);
}
