function check_square() {
    var check4 = document.getElementById("check4").value;
    var check9 = document.getElementById("check9").value; 
    if ((check4 == "4") && (check9 == "9"))  {
        console.log("checked ! ")
        $(".to_hide").css("visibility", "hidden");  
        $(".to_show").css("visibility", "visible");  
        $(".birthday").css("background-size", "100%");              
    }
}

function check_soulages() {
        var val = document.getElementById("soulages").value;
        if (val.toLowerCase() == "soulages") {
            $(".to_hide").css("visibility", "hidden");  
            $(".to_show").css("visibility", "visible");                   
        }
    }