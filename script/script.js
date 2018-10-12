$(document).ready(function(){

    coords.push(new Array());

    initMap();

    startApp();

});


function findLine(x, y){

    for( let i = 0; i < coords.length; i++){
        for( let j = 0; j < coords[i].length - 1; j++){

            var a = (
                ((coords[i][j].Y - coords[i][j + 1].Y) * x) +
                ((coords[i][j + 1].X - coords[i][j].X) * y) +
                ((coords[i][j].X * coords[i][j + 1].Y) - (coords[i][j + 1].X * coords[i][j].Y))
            );

            if ( a > -0.5 && a < 0.5){

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

    $("#startValue").on('keydown',function(event){
        if (event.keyCode === 13) {
            createLine();
            $(this).val("");
            $(this).focus();
        }
    });

    $("#pushValue").click(function() {
        createLine();
        $(this).focus();
    });

    $("#newArrow").click(function() {
        coords.push(new Array());
        myColor = random(0, 4);
        allLengthInMeters = 0;
    });

    $()
}

function initMap(){

    allLengthInMeters = 0;

    geocoder = new google.maps.Geocoder();

    let latlng = new google.maps.LatLng(7.5653, 80.4303);
    let mapOptions = {
        zoom: 4,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var result = document.getElementById('result');

    setZoom();

}

function translateToEng(c){
    for (let i = 0; i < countryArrayRUS.length; i++){
        if (c == countryArrayRUS[i]){
            return countryArrayENG[i];
        }
    }
}

function evalWeight(){
    let a =  countryList[countryList.length - 1];
    if(a["IsFill"])
        return((+a["Cultural Rating"] + + a["Economic Rating"] + + a["Political Rating"]) / 3 )
    else    
        return 4;    
}

function evalColor(){
    let a =  countryList[countryList.length - 1];
    if(a["IsFill"]){

        let b =  ((+a["Cultural Rating"] + + a["Economic Rating"] + + a["Political Rating"]) )

        if ( b > 0 && b < 6)
            return myColors[1]
        else if ( b > 5 && b < 11)
            return myColors[2]
        else if ( b > 10 && b < 16)   
            return myColors[3]      
    } else
            return myColors[4]     
}

function createLine(){

    coords[coords.length - 1].push(new Coord(0, 0, ""));

    coords[coords.length - 1][coords[coords.length - 1].length - 1].Address = document.getElementById('startValue').value;

    if (coords[coords.length - 1].length > 1){
        firstAddress  = coords[coords.length - 1][coords[coords.length - 1].length - 2].Address;
        secondAddress = coords[coords.length - 1][coords[coords.length - 1].length - 1].Address;
    } else {
        firstAddress = coords[coords.length - 1][coords[coords.length - 1].length - 1].Address;
    }

    let firstPosXY, secondPosXY;

    geocoder.geocode({ 'address': firstAddress }, function (results, status) {
        firstPosXY = results[0].geometry.location;
        var fc = results[0].address_components[results[0].address_components.length - 1]["long_name"];
        fc = translateToEng(fc);

        if (coords[coords.length - 1].length > 1){
            geocoder.geocode({ 'address': secondAddress }, async function (results, status) {
                secondPosXY = results[0].geometry.location;
                var sc = results[0].address_components[results[0].address_components.length - 1]["long_name"];
                sc = translateToEng(sc);
                let lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                };

                route = [
                    firstPosXY,
                    secondPosXY
                ];

                //Get firstCountry: secondCountry
                getData(fc, sc).then(function () {

                    if (!noFill) {

                        let innerText = document.getElementById('outputInfo').value;

                        innerText+= countryList[countryList.length - 1]["Cultural Information"];
                        innerText+= countryList[countryList.length - 1]["Economic Information"];
                        innerText+= countryList[countryList.length - 1]["Political Information"];
                    }

                    polylineOptions = {

                        path: route,
                        icons: [{
                            icon: lineSymbol,
                            offset: myOffset
                        }],

                        strokeColor: evalColor(),
                        strokeOpacity: myOpacity,
                        strokeWeight: evalWeight()

                    };

                    polyline = new google.maps.Polyline(polylineOptions);
                    polylines.push(polyline);

                    firstLocation = convertLocationToLatLong(firstPosXY.toUrlValue());
                    secondLocation = convertLocationToLatLong(secondPosXY.toUrlValue());
                    coords[coords.length - 1][coords[coords.length - 1].length - 1].X = secondLocation[0];
                    coords[coords.length - 1][coords[coords.length - 1].length - 1].Y = secondLocation[1];

                    lengthInMeters = 0; //Init the length of previous route
                    lengthInMeters = Math.round(google.maps.geometry.spherical.computeLength(polyline.getPath()));
                    allLengthInMeters += lengthInMeters;

                    polyline.setMap(map);

                    //Work with increasing the map
                    plotMap(firstLocation,secondLocation);

                    let coordinatesArr = polyline.getPath().getArray();

                    convertPolylineToJSON(coordinatesArr);

                    // Event to create Info-window about the route
                    polyline.addListener('click', aboutArrow);

                });
            });

            firstAddress = secondAddress;

        } else {

            firstLocation = convertLocationToLatLong(firstPosXY.toUrlValue());

            coords[coords.length - 1][coords[coords.length - 1].length - 1].X = firstLocation[0];
            coords[coords.length - 1][coords[coords.length - 1].length - 1].Y = firstLocation[1];

            plotMap(firstLocation);

            polyline = new google.maps.Polyline(polylineOptions);

            let coordinatesArr = polyline.getPath().getArray();
            convertPolylineToJSON(coordinatesArr);
        }
    });
}

function convertLocationToLatLong(loc){

    loc = loc.split(',').map(function(item) {
        return parseFloat(item);
    });

    return loc;
}

function plotMap(firstLoc,secondLoc){

    //Increases current location

    firstLoc = new google.maps.LatLng(firstLoc[0],firstLoc[1]);

    if (secondLoc){

        secondLoc = new google.maps.LatLng(secondLoc[0],secondLoc[1]);
    }

    let bounds = new google.maps.LatLngBounds();

    bounds.extend(firstLoc);

    if(secondLoc) {

        bounds.extend(secondLoc);
    }

    map.fitBounds(bounds);

    setZoom();
}

function setZoom(){

    google.maps.event.addListener(map, 'zoom_changed', function() {
        zoomChangeBoundsListener =
            google.maps.event.addListener(map, 'bounds_changed', function(event) {
                if (this.getZoom() > 15 && this.initialZoom === true) {

                    // Change max/min zoom here
                    this.setZoom(15);
                    this.initialZoom = false;
                }

                google.maps.event.removeListener(zoomChangeBoundsListener);
            });
    });

    map.initialZoom = true;
}

function aboutArrow(event) {

    infoWindow = new google.maps.InfoWindow;

    // let lat = event.latLng.lat();
    // let lng = event.latLng.lng();
    //
    // let tempArr = findLine(lat, lng);

    let j = 0;

    let contentString = '<b>Your way</b><br>';

    // for (let i = 0; i < tempArr.length; i++) {
    //     contentString+= '<br>' + 'Coordinate ' + j + ':<br>' +
    //         tempArr[i].Address;
    //     j++;
    // }

    // for (let i = coords[coords.length - 1].length; i > 0; i--) {
    //     contentString += '<br>' + 'Coordinate ' + j + ':<br>' +
    //         coords[coords.length - 1][coords[coords.length - 1].length - i].Address;
    //     j++;
    // }

    // contentString+= '<br><br>' + '<b>Way length: </b>' +
    //     allLengthInMeters + ' meters' + '<br>' + '<b>Dry cargo: </b>' +
    //     coords[coords.length - 1][coords[coords.length - 1].length - 1].DryCargo;

    // if (amountInput === '0') {
    //     contentString+= ' (input dry cargo)';
    // } else if ($('.cargoValueOfKg').prop("checked")) {
    //     contentString+= ' kg';
    // } else if ($('.cargoValueOfTon').prop("checked")) {
    //     contentString+= ' ton';
    // }

    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    // google.maps.event.addListener(infoWindow, 'domready', function(){
    //     $(".gm-style-iw").next("div").hide();
    // });

    infoWindow.open(map);
}

function convertPolylineToJSON(coordinatesArr) {

    for(let i = 0; i < coordinatesArr.length; i++) {

        let polylineLat = coordinatesArr[i].lat();
        let polylineLng = coordinatesArr[i].lng();

        let polylineLatLng = new Coord(polylineLat, polylineLng);

        newCoordinatesArr.push(polylineLatLng);
    }

    strCoordinatesPolyline = JSON.stringify(newCoordinatesArr);
    jsonPolyline = "{\"coordinates\":" + strCoordinatesPolyline + ":";

    console.log(jsonPolyline);
}