$(document).ready(function(){
    $("#powerbank-capacity-mah").on("input", function(){
        var voltage = parseFloat($("#powerbank-voltage").val())
        var capacity_mah = parseFloat($(this).val())
        var capacity_wh = capacity_mah * voltage / 1000
        $("#powerbank-capacity-wh").val(strip_zeros_after_decimal(capacity_wh.toFixed(2)))
    })

    $("#powerbank-capacity-wh").on("input", function(){
        var voltage = parseFloat($("#powerbank-voltage").val())
        var capacity_wh = parseFloat($(this).val())
        var capacity_mah = capacity_wh * 1000 / voltage
        $("#powerbank-capacity-mah").val(strip_zeros_after_decimal(capacity_mah.toFixed(2)))
    })

    $("#powerbank-voltage").on("change", function(){
        var voltage = parseFloat($(this).val())
        var capacity_mah = parseFloat($("#powerbank-capacity-mah").val())
        var capacity_wh = capacity_mah * voltage / 1000
        $("#powerbank-capacity-wh").val(strip_zeros_after_decimal(capacity_wh.toFixed(2)))
    })

    // voltage buttons click event
    $("[id^='powerbank-voltage-']").on("click", function(){
        var voltage = parseFloat($(this).text().split("V")[0])
        $("#powerbank-voltage").val(voltage)
        $("#powerbank-voltage").trigger("change")
    })

    // capacity buttons click event mah
    $("[id^='powerbank-capacity-mah-']").on("click", function(){
        var capacity = parseFloat($(this).text().split("mAh")[0])
        $("#powerbank-capacity-mah").val(capacity)
        $("#powerbank-capacity-mah").trigger("input")
    })

    // capacity buttons click event wh
    $("[id^='powerbank-capacity-wh-']").on("click", function(){
        var capacity = parseFloat($(this).text().split("Wh")[0])
        $("#powerbank-capacity-wh").val(capacity)
        $("#powerbank-capacity-wh").trigger("input")
    })
})

function strip_zeros_after_decimal(num) {
    if(num.includes('.')) {
        return num.replace(/\.?0*$/, '');
    }
    return num;
}
