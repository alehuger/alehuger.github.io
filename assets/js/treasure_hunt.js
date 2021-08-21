function check_square() {
    var val = document.getElementById("check").value;
    if (val == "4") {
        console.log("sd")
        $(".to_hide").css("visibility", "hidden");  
        $(".to_show").css("visibility", "visible");  
        $(".birthday").css("background-size", "100%");
        $("p").css("color", "green");       
    }
}

function check_soulages() {
        var val = document.getElementById("soulages").value;
        if (val == "Soulages") {
            $(".to_hide").css("visibility", "hidden");  
            $(".to_show").css("visibility", "visible");                   
        }
    }