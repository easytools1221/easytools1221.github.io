

function insert_ads_card_list(){
    const card_list_container = document.getElementById("tools_list")    
    const cards = card_list_container.querySelectorAll(".col-md-6.col-lg-4")
    const ads_insert_interval = 4

    const adClient = 'ca-pub-7255560333193386';
    const adSlot = '1316803674';
    const adFormat = 'auto'; 
    //const adLayoutKey = '-gw-3+1f-3d+2z';
    
    let ads_count = 0

    cards.forEach((card, index) => {
        if ((index + 1) % ads_insert_interval === 0) {
            const card_node = card.cloneNode(true) 
            const card_body = card_node.querySelector(".card-body")

            card_body.innerHTML = ""

            const insElement = document.createElement('ins');
            insElement.className = 'adsbygoogle';
            insElement.style.display = 'block';
            insElement.setAttribute('data-ad-client', adClient);
            insElement.setAttribute('data-ad-slot', adSlot);
            insElement.setAttribute('data-ad-format', adFormat);
            //insElement.setAttribute('data-ad-layout-key', adLayoutKey);
            insElement.setAttribute('data-full-width-responsive', "true");

            card_body.appendChild(insElement);

            // 將廣告容器插入到當前卡片之後
            card.parentNode.insertBefore(card_node, card.nextSibling);

            ads_count++; // 記錄插入的廣告數量
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    })
}
