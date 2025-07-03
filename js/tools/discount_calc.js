function update_discount_price(){
    const price_input = $("#price-input").val()
    if(price_input == "") return

    var ori_price = parseFloat(price_input)
    var discnt_price = ori_price * parseFloat($("#discount-ratio-input").val())
    if($("#service-fee").prop("checked")){
        if($("#service-ori").prop("checked")){
            discnt_price = discnt_price + ori_price * 0.1
        }
        else{
            discnt_price *= 1.1 
        }
        ori_price *= 1.1
    }
    $("#price-output").val(discnt_price.toFixed(2))
    $("#discount-output").val((ori_price - discnt_price).toFixed(2))
}

function update_discount(e=null){
    let id = null
    let input_value = 0

    if(e != null){
        //console.log(e.id)
        id = e.id
        input_value = parseFloat($("#"+e.id).val())
    }
    else{
        id = "discount-ratio-input"
        input_value = parseFloat($("#discount-ratio-input").val())
    }
    let normal_value = 0
    
    if(id == "discount-input"){
        normal_value = input_value / 100.0
    }
    else if(id == "discount-ratio-input"){
        normal_value = input_value
    }
    else if(id == "discount-off-input"){
        normal_value = 1.0 - (input_value / 100.0)
    }

    //console.log(normal_value)
    $("#discount-ratio-input").val(normal_value.toFixed(2))
    $("#discount-input").val((normal_value * 100.0).toFixed(0))
    $("#discount-off-input").val((100.0 - (normal_value * 100.0)).toFixed(0))

}

function quick_discount(discount){
    $('#discount-ratio-input').val(discount)
    update_discount()
    update_discount_price()
}

$("#price-input").on("change", function(){
    update_discount_price()
})

$("#discount-input").on("change", function(){
    update_discount(this)
    update_discount_price()
})
$("#discount-ratio-input").on("change", function(){
    update_discount(this)
    update_discount_price()
})
$("#discount-off-input").on("change", function(){
    update_discount(this)
    update_discount_price()
})
