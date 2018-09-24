$(document).ready(function(){

    coords.push(new Array());

    initMap();

    startApp();

});

function checkVolume() {

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

    $("#pushValue").click(function(){
        createLine();
        $(this).focus();
    });

    $("#newArrow").click(function () {
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

    setZoom();

    let input = /** @type {HTMLInputElement} */(
        document.getElementById('startValue'));

    let searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));
}

function createLine(){

    amountInput = /** @type {HTMLInputElement} */(
        document.getElementById('amountValue').value);

    coords[coords.length - 1].push(new Coord(0, 0, "", amountInput));

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

        if (coords[coords.length - 1].length > 1){
            geocoder.geocode({ 'address': secondAddress }, function (results, status) {
                secondPosXY = results[0].geometry.location;
                //document.getElementById('results').innerHTML += secondPosXY.toUrlValue()+"<br>";

                let lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
                };

                route = [
                    firstPosXY,
                    secondPosXY
                ];

                polylineOptions = {
                    path: route,
                    icons: [{
                        icon: lineSymbol,
                        offset: myOffset
                    }],
                    strokeColor: myColors[myColor],
                    strokeOpacity: myOpacity,
                    strokeWeight: myWeight
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
                //document.getElementById('results').innerHTML += "Polyline is "+ lengthInMeters +" meters long<br>";

                polyline.setMap(map);

                //Work with increasing the map
                plotMap(firstLocation,secondLocation);

                let coordinatesArr = polyline.getPath().getArray();

                convertPolylineToJSON(coordinatesArr);

                // Event to create Info-window about the route
                polyline.addListener('click', aboutArrow);
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

    let j = 0;

    let contentString = '<b>Your way</b><br>';

    for (let i = coords[coords.length - 1].length; i > 0; i--) {
        contentString += '<br>' + 'Coordinate ' + j + ':<br>' +
            coords[coords.length - 1][coords[coords.length - 1].length - i].Address;
        j++;
    }

    contentString+= '<br><br>' + '<b>Way length: </b>' +
        allLengthInMeters + ' meters' + '<br>' + '<b>Dry cargo: </b>' +
        coords[coords.length - 1][coords[coords.length - 1].length - 1].DryCargo;

    if (amountInput === '0') {
        contentString+= ' (input dry cargo)';
    } else if ($('.cargoValueOfKg').prop("checked")) {
        contentString+= ' kg';
    } else if ($('.cargoValueOfTon').prop("checked")) {
        contentString+= ' ton';
    }

    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    google.maps.event.addListener(infoWindow, 'domready', function(){
        $(".gm-style-iw").next("div").hide();
    });

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