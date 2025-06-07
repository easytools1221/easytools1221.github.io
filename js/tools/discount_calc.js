function update_discount_price(){
    var ori_price = parseFloat($("#price-input").val())
    var discnt_price = ori_price * parseFloat($("#discount-input").val())
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

function quick_discount(discount){
    $('#discount-input').val(discount)
    update_discount_price()
}

$("#price-input").on("change", function(){
    update_discount_price()
})
$("#discount-input").on("change", function(){
    update_discount_price()
})
