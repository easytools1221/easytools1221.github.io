function gcd(a, b){
    if(a % b == 0) return b;
    return gcd(b, a%b);
}

$(document).ready(function(){
    $("#calc-ratio").on("click", function(){
        let width = parseInt($("#screen-width").val())
        let height = parseInt($("#screen-height").val())

        const mag = gcd(width, height)

        $("#ratio-width").val(width / mag)
        $("#ratio-height").val(height / mag)
        $("#magnification").val(mag)
    }) 
    
    $("#calc-value").on("click", function(){
        let width = parseInt($("#ratio-width").val())
        let height = parseInt($("#ratio-height").val())
        let mag = parseInt($("#magnification").val())

        $("#screen-width").val(width * mag)
        $("#screen-height").val(height * mag)
    }) 
})
