class Coord {
  constructor(x, y, adr, amount) {
    this.Address = adr;
    this.X = x;
    this.Y = y;
    this.DryCargo = amount;
  }
}

const countryArrayENG = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua & Deps",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Rep",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea North",
  "Korea South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "St Kitts & Nevis",
  "St Lucia",
  "Saint Vincent & the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];
const countryArrayRUS = [
  "Афганистан",
  "Албания",
  "Алжир",
  "Андорра",
  "Ангола",
  "Антигуа и Депс",
  "Аргентина",
  "Армения",
  "Австралия",
  "Австрия",
  "Азербайджан",
  "Багамские Острова",
  "Бахрейн",
  "Бангладеш",
  "Барбадос",
  "Беларусь",
  "Бельгия",
  "Белиз",
  "Бенин",
  "Бутан",
  "Боливия",
  "Босния и Герцеговина",
  "Ботсвана",
  "Бразилия",
  "Бруней",
  "Болгария",
  "Буркина",
  "Бурунди",
  "Камбоджа",
  "Камерун",
  "Канада",
  "Кабо-Верде",
  "Центральноафриканская Республика",
  "Чад",
  "Чили",
  "Китай",
  "Колумбия",
  "Коморские Острова",
  "Конго",
  "Коста-Рика",
  "Хорватия",
  "Куба",
  "Кипр",
  "Чешская Республика",
  "Дания",
  "Джибути",
  "Доминика",
  "Доминиканская Республика",
  "Восточный Тимор",
  "Эквадор",
  "Египет",
  "Сальвадор",
  "Экваториальная Гвинея",
  "Эритрея",
  "Эстония",
  "Эфиопия",
  "Фиджи",
  "Финляндия",
  "Франция",
  "Габон",
  "Гамбия",
  "Грузия",
  "Германия",
  "Гана",
  "Греция",
  "Гренада",
  "Гватемала",
  "Гвинея",
  "Гвинея-Бисау",
  "Гайана",
  "Гаити",
  "Гондурас",
  "Венгрия",
  "Исландия",
  "Индия",
  "Индонезия",
  "Иран",
  "Ирак",
  "Ирландия",
  "Израиль",
  "Италия",
  "Кот-д'Ивуар",
  "Ямайка",
  "Япония",
  "Иордания",
  "Казахстан",
  "Кения",
  "Кирибати",
  "Северная Корея",
  "Южная Корея",
  "Косово",
  "Кувейт",
  "Кыргызстан",
  "Лаос",
  "Латвия",
  "Ливан",
  "Лесото",
  "Либерия",
  "Ливия",
  "Лихтенштейн",
  "Литва",
  "Люксембург",
  "Македония",
  "Мадагаскар",
  "Малави",
  "Малайзия",
  "Мальдивы",
  "Мали",
  "Мальта",
  "Маршалловы Острова",
  "Мавритания",
  "Маврикий",
  "Мексика",
  "Микронезия",
  "Молдова",
  "Монако",
  "Монголия",
  "Черногория",
  "Марокко",
  "Мозамбик",
  "Мьянма",
  "Намибия",
  "Науру",
  "Непал",
  "Нидерланды",
  "Новая Зеландия",
  "Никарагуа",
  "Нигер",
  "Нигерия",
  "Норвегия",
  "Оман",
  "Пакистан",
  "Палау",
  "Панама",
  "Папуа-Новая Гвинея",
  "Парагвай",
  "Перу",
  "Филиппины",
  "Польша",
  "Португалия",
  "Катар",
  "Румыния",
  "Россия",
  "Руанда",
  "Сент-Китс и Невис",
  "Сент-Люсия",
  "Сент-Винсент и Гренадины",
  "Самоа",
  "Сан-Марино",
  "Сан-Томе и Принсипи",
  "Саудовская Аравия",
  "Сенегал",
  "Сербия",
  "Сейшельские острова",
  "Сьерра-Леоне",
  "Сингапур",
  "Словакия",
  "Словения",
  "Соломоновы Острова",
  "Сомали",
  "Южная Африка",
  "Южный Судан",
  "Испания",
  "Шри Ланка",
  "Судан",
  "Суринам",
  "Свазиленд",
  "Швеция",
  "Швейцария",
  "Сирия",
  "Тайвань",
  "Тайвань",
  "Танзания",
  "Таиланд",
  "Того",
  "Тонга",
  "Тринидад и Тобаго",
  "Тунис",
  "Турция",
  "Туркменистан",
  "Тувалу",
  "Уганда",
  "Украина",
  "Объединенные Арабские Эмираты",
  "Великобритания",
  "Соединенные Штаты",
  "Уругвай",
  "Узбекистан",
  "Вануату",
  "Ватикан",
  "Венесуэла",
  "Вьетнам",
  "Йемен",
  "Замбия",
  "Зимбабве"
];

const rating = [
  "-5", "-4", "-3", "-2", "-1", "0",
  "1", "2", "3", "4", "5"
];

const years = [
  "2017",
  "2018",
  "2019"
];

const month = [
  "1",
  "2", 
  "3", 
  "4", 
  "5", 
  "6", 
  "7", 
  "8", 
  "9", 
  "10", 
  "11", 
  "12"
];

initCustomForm = function(){  
  var firstCoutrySelect = document.getElementById("CFCI").options;
  var secondCoutrySelect = document.getElementById("CSCI").options;
  var culturalCustomRatingSelect = document.getElementById("CCRI").options;
  var economicCustomRatingSelect = document.getElementById("CERI").options;
  var politicalCustomRatingSelect = document.getElementById("CPRI").options;
  var yearCustomSelect = document.getElementById("CCY").options;
  var monthCustomSelect = document.getElementById("CCM").options;

  countryArrayENG.forEach(option =>
    firstCoutrySelect.add(new Option(option, option))
  );

  countryArrayENG.forEach(option =>
    secondCoutrySelect.add(new Option(option, option))
  );

  rating.forEach(option => {
    culturalCustomRatingSelect.add(new Option(option, option));    
    economicCustomRatingSelect.add(new Option(option, option));    
    politicalCustomRatingSelect.add(new Option(option, option));
  });

  years.forEach(option => {
    yearCustomSelect.add(new Option(option, option));
  });

  month.forEach(option => {
    monthCustomSelect.add(new Option(option, option));
  });
}

initRequestForm = function(){

  var culturalRatingSelect = document.getElementById("CRI").options;
  var economicRatingSelect = document.getElementById("ERI").options;
  var politicalRatingSelect = document.getElementById("PRI").options;
  var yearSelect = document.getElementById("CY").options;
  var monthSelect = document.getElementById("CM").options;
  
  rating.forEach(option => {
    
    culturalRatingSelect.add(new Option(option, option));    
    economicRatingSelect.add(new Option(option, option));
    politicalRatingSelect.add(new Option(option, option));    
  });

  years.forEach(option => {
    yearSelect.add(new Option(option, option));
  });

  month.forEach(option => {
    monthSelect.add(new Option(option, option));
  });
}



var firstLocation;
var secondLocation;
var outputContent = "none";

var firstAddress = "none";
var secondAddress = "none";
var infoWindow;
var polyline;
var polylineOptions;
var route;
var lengthInMeters;

var allLengthInMeters = 0;

var map;

var myColor;

var newCoordinatesArr = [];
var coords = [];
var polylines = [];

var strCoordinatesPolyline;
var jsonPolyline;

const myOffset = "100%";
const myColors = ["red", "yellow", "green", "black"]; //red, blue, green, yellow, black
const myOpacity = 1;

//DB
var firstCountry;
var secondCountry;
var countryList = [];
var noFill = false;
