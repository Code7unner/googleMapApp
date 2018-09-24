class Coord{
    constructor(x, y, adr, amount){
        this.Address = adr;
        this.X = x;
        this.Y = y;
        this.DryCargo = amount;
    }
}

var firstLocation;
var secondLocation;

var firstAddress;
var secondAddress;

var polyline;
var polylineOptions;
var route;
var lengthInMeters;
var amountInput;

var allLengthInMeters = 0;

var map;

var myColor;

var newCoordinatesArr = [];
var coords = [];
var polylines = [];

var strCoordinatesPolyline;
var jsonPolyline;

var cargoValueOfTon = document.getElementsByName('cargoValueOfTon');
var cargoValueOfKg = document.getElementsByName('cargoValueOfKg');

const myOffset = '100%';
const myColors = ['red', 'blue', 'green', 'yellow', 'black']; //red, blue, green, yellow, black
const myOpacity = 1;
const myWeight = 4;


