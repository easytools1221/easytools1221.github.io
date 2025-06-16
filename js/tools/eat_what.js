$(document).ready(function() {
    // 定義食物建議
    let foodSuggestions = {
        '早餐': ['稀飯', '蛋餅', '燒餅油條', '三明治', '飯糰', '吐司'],
        '午餐': ['便當', '麵食', '義大利麵', '水餃', '蓋飯', '滷肉飯'],
        '晚餐': ['火鍋', '牛排', '咖哩飯', '披薩', '自助餐', '滷味'],
        '點心': ['雞排', '鹽酥雞', '蛋糕', '麵包', '水果', '豆花'],
        '宵夜': ['鹹酥雞', '滷味', '泡麵', '烤肉', '蚵仔煎'],
    };

    let selectedMealType = '午餐'; // 預設為午餐

    // 渲染餐別按鈕
    function renderMealTypeButtons() {
        const buttonsHtml = Object.keys(foodSuggestions).map(mealType => `
            <button type="button" class="btn btn-meal-type rounded-pill px-3 py-2 fs-5 fw-bold ${selectedMealType === mealType ? 'active' : ''}" data-meal-type="${mealType}">
                ${mealType}
            </button>
        `).join('');
        $('#mealTypeButtons').html(buttonsHtml);
    }

    // 渲染食物選項列表
    function renderFoodOptions() {
        $('#currentMealTypeTitle').text(`${selectedMealType} 選項`);
        const foods = foodSuggestions[selectedMealType];
        let optionsHtml = '';
        if (foods && foods.length > 0) {
            optionsHtml = foods.map(food => `
                <span class="border rounded px-2 bg-secondary-subtle">
                    ${food}
                    <button type="button" class="btn-close" aria-label="刪除 ${food}" data-food="${food}"></button>
                </span>
            `).join('');
        } else {
            optionsHtml = '<p class="text-muted fst-italic">目前沒有選項。</p>';
        }
        $('#foodOptionsList').html(optionsHtml);
        $('#newFoodInput').attr('placeholder', `新增選項...`);
        // Clear the suggested food text when meal type changes
        $('#suggestedFoodText').text('點擊按鈕獲取建議！');
    }

    // 處理餐別選擇
    $('#mealTypeButtons').on('click', '.btn-meal-type', function() {
        selectedMealType = $(this).data('meal-type');
        $('.btn-meal-type').removeClass('active');
        $(this).addClass('active');
        renderFoodOptions(); // 重新渲染食物選項並清除建議
    });

    // 處理新增食物
    $('#addFoodButton').on('click', function() {
        const newFood = $('#newFoodInput').val().trim();
        if (newFood !== '' && !foodSuggestions[selectedMealType].includes(newFood)) {
            foodSuggestions[selectedMealType].push(newFood);
            renderFoodOptions(); // 更新顯示
            $('#newFoodInput').val(''); // 清空輸入框
        }
    });

    // 允許按 Enter 鍵新增食物
    $('#newFoodInput').on('keypress', function(e) {
        if (e.which === 13) { // 13 is Enter key
            $('#addFoodButton').click();
        }
    });

    // 處理刪除食物 (使用事件委託)
    $('#foodOptionsList').on('click', '.btn-close', function() {
        const foodToRemove = $(this).data('food');
        foodSuggestions[selectedMealType] = foodSuggestions[selectedMealType].filter(food => food !== foodToRemove);
        renderFoodOptions(); // 更新顯示
    });

    // 產生隨機食物建議
    $('#generateSuggestionButton').on('click', function() {
        const foods = foodSuggestions[selectedMealType];
        if (foods && foods.length > 0) {
            const randomIndex = Math.floor(Math.random() * foods.length);
            const suggestedFood = foods[randomIndex];
            $('#suggestedFoodText').text(suggestedFood);
            // No need to remove 'd-none' as it's always visible now
        } else {
            $('#suggestedFoodText').text('此類別沒有建議食物');
        }
    });

    // 初始化應用程式
    renderMealTypeButtons();
    renderFoodOptions();
});
