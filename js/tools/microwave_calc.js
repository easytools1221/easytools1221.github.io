$("#calc").on("click", function(){
    var power = parseInt($("#exp-power").val())
    var exp_time = parseInt($("#exp-min").val()) * 60 + parseInt($("#exp-sec").val())
    var oven_power = parseInt($("#oven-power").val())

    var oven_time = Math.floor((power * exp_time) / oven_power)

    $("#oven-min").val(Math.floor(oven_time / 60))
    $("#oven-sec").val(oven_time % 60)
})
