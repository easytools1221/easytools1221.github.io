function calc_cp(){
    const price = parseFloat($("#price").val())
    const quantity = parseFloat($("#quantity").val())
    $("#cp-per-1").val((price / quantity * 1.0).toFixed(4))
    $("#cp-per-100").val((price / quantity * 100.0).toFixed(2))
}

$(document).ready(function(){
    $("#price").on("change", calc_cp)
    $("#quantity").on("change", calc_cp) 
    calc_cp()
})
