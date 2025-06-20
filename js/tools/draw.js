$(document).ready(function(){
    $("#draw-btn").on("click", function(){
        let r = Math.floor(Math.random() * $("[name^='draw']").length)
        $("#draw-output").val($("[name^='draw']")[r].value)
    })
})
