function getBathValue(){
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked)
            return parseInt(i)+1;
    }
    return -1;
}

function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked)
            return parseInt(i)+1;
    }
    return -1;
}

function onClickedEstimatePrice(){
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    console.log("sqft is :"+document.getElementById("uiSqft").value);
    var bhk = getBHKValue();
    console.log("bhk is :"+getBHKValue());
    var bathrooms = getBathValue();
    console.log("bath is :"+getBathValue());
    var location = document.getElementById("uiLocations").value;
    console.log("location is :"+document.getElementById("uiLocations").value);
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url , {
        total_sqft:parseFloat(sqft),
        bhk:bhk,
        bath:bathrooms,
        location:location
    },function(data , status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>"+data.estimated_price.toString()+ " Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad(){
    console.log("Document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url,function(data , status){
        console.log("got response for get_location_names request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations)
            {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad();