
function createChart(){
    let cInfo = ['Cultural'];
    let eInfo = ['Economic'];
    let pInfo = ['Political'];
    let a =  countryList[countryList.length - 1];

    if(a["IsFill"]){

        if (a["Cultural Information"].length > 1){
            for (let i = 1; i < a["Cultural Information"].length; i++){
                cInfo.push(a["Cultural Information"][i].rating);
            }
        } 

        if (a["Economic Information"].length > 1){
            for (let i = 1; i < a["Economic Information"].length; i++){
                eInfo.push(a["Economic Information"][i].rating);
            }
        }

        if (a["Political Information"].length > 1){
            for (let i = 1; i < a["Political Information"].length; i++){
                pInfo.push(a["Political Information"][i].rating);
            }
        }
    }

    var chart = c3.generate({
      bindto: '#chart',
      data: {
      columns: [
        cInfo,
        eInfo,
        pInfo
      ]
    }
    })
}

