let currentLotteryType = 'lotto649';
let excludeNumbers = [];
let preferNumbers = [];
        
// 樂透規則
const lotteryRules = {
    lotto649: {
        name: '大樂透',
        normalRange: [1, 49],
        normalCount: 6,
        specialRange: null,
        specialCount: 0
    },
    superlotto: {
        name: '威力彩',
        normalRange: [1, 38],
        normalCount: 6,
        specialRange: [1, 8],
        specialCount: 1
    }
};

// 樂透類型切換
document.querySelectorAll('.lottery-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lottery-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentLotteryType = this.dataset.type;
        updateInputRanges();
        clearAll();
    });
});

// 更新輸入範圍
function updateInputRanges() {
    const rule = lotteryRules[currentLotteryType];
    document.getElementById('excludeInput').max = rule.normalRange[1];
    document.getElementById('preferInput').max = rule.normalRange[1];
}

// 添加排除號碼
function addExcludeNumber() {
    const input = document.getElementById('excludeInput');
    const number = parseInt(input.value);
    const rule = lotteryRules[currentLotteryType];
    
    if (number && number >= rule.normalRange[0] && number <= rule.normalRange[1]) {
        if (!excludeNumbers.includes(number) && !preferNumbers.includes(number)) {
            excludeNumbers.push(number);
            updateExcludeDisplay();
            input.value = '';
        } else {
            alert('號碼已存在於排除或偏好清單中！');
        }
    } else {
        alert(`請輸入 ${rule.normalRange[0]} 到 ${rule.normalRange[1]} 之間的數字！`);
    }
}

// 添加偏好號碼
function addPreferNumber() {
    const input = document.getElementById('preferInput');
    const number = parseInt(input.value);
    const rule = lotteryRules[currentLotteryType];
    
    if (number && number >= rule.normalRange[0] && number <= rule.normalRange[1]) {
        if (!preferNumbers.includes(number) && !excludeNumbers.includes(number)) {
            preferNumbers.push(number);
            updatePreferDisplay();
            input.value = '';
        } else {
            alert('號碼已存在於偏好或排除清單中！');
        }
    } else {
        alert(`請輸入 ${rule.normalRange[0]} 到 ${rule.normalRange[1]} 之間的數字！`);
    }
}

// 更新排除號碼顯示
function updateExcludeDisplay() {
    const container = document.getElementById('excludeNumbers');
    if (excludeNumbers.length === 0) {
        container.innerHTML = '<span style="color: #999; font-style: italic;">尚未設定排除號碼</span>';
    } else {
        container.innerHTML = excludeNumbers.sort((a, b) => a - b).map(num => 
            `<span class="number-tag excluded">
                ${num}
                <span class="remove-btn" onclick="removeExcludeNumber(${num})">×</span>
            </span>`
        ).join('');
    }
}

// 更新偏好號碼顯示
function updatePreferDisplay() {
    const container = document.getElementById('preferNumbers');
    if (preferNumbers.length === 0) {
        container.innerHTML = '<span style="color: #999; font-style: italic;">尚未設定偏好號碼</span>';
    } else {
        container.innerHTML = preferNumbers.sort((a, b) => a - b).map(num => 
            `<span class="number-tag">
                ${num}
                <span class="remove-btn" onclick="removePreferNumber(${num})">×</span>
            </span>`
        ).join('');
    }
}

// 移除排除號碼
function removeExcludeNumber(num) {
    excludeNumbers = excludeNumbers.filter(n => n !== num);
    updateExcludeDisplay();
}

// 移除偏好號碼
function removePreferNumber(num) {
    preferNumbers = preferNumbers.filter(n => n !== num);
    updatePreferDisplay();
}

// 清空排除號碼
function clearExcludeNumbers() {
    excludeNumbers = [];
    updateExcludeDisplay();
}

// 清空偏好號碼
function clearPreferNumbers() {
    preferNumbers = [];
    updatePreferDisplay();
}

// 清空所有設定
function clearAll() {
    excludeNumbers = [];
    preferNumbers = [];
    updateExcludeDisplay();
    updatePreferDisplay();
}

// 產生號碼
function generateNumbers() {
    const rule = lotteryRules[currentLotteryType];
    const resultArea = document.getElementById('resultArea');
    
    // 檢查是否有足夠的號碼可選
    const availableNumbers = [];
    for (let i = rule.normalRange[0]; i <= rule.normalRange[1]; i++) {
        if (!excludeNumbers.includes(i)) {
            availableNumbers.push(i);
        }
    }
    
    if (availableNumbers.length < rule.normalCount) {
        alert('排除的號碼太多了，無法產生足夠的號碼！');
        return;
    }
    
    // 產生一般號碼
    const selectedNumbers = [];
    const weightedNumbers = [];
    
    // 建立加權陣列（偏好號碼出現3倍機率）
    availableNumbers.forEach(num => {
        const weight = preferNumbers.includes(num) ? 3 : 1;
        for (let i = 0; i < weight; i++) {
            weightedNumbers.push(num);
        }
    });
    
    // 隨機選擇號碼
    while (selectedNumbers.length < rule.normalCount) {
        const randomIndex = Math.floor(Math.random() * weightedNumbers.length);
        const selectedNumber = weightedNumbers[randomIndex];
        
        if (!selectedNumbers.includes(selectedNumber)) {
            selectedNumbers.push(selectedNumber);
        }
        
        // 移除已選中的號碼以避免重複
        for (let i = weightedNumbers.length - 1; i >= 0; i--) {
            if (weightedNumbers[i] === selectedNumber) {
                weightedNumbers.splice(i, 1);
            }
        }
    }
    
    selectedNumbers.sort((a, b) => a - b);
    
    // 產生特別號（威力彩）
    let specialNumber = null;
    if (rule.specialRange) {
        specialNumber = Math.floor(Math.random() * rule.specialRange[1]) + rule.specialRange[0];
    }
    
    // 顯示結果
    displayResult(rule.name, selectedNumbers, specialNumber);
}

// 顯示結果
function displayResult(lotteryName, normalNumbers, specialNumber) {
    const resultArea = document.getElementById('resultArea');
    
    let numbersHtml = normalNumbers.map(num => 
        `<div class="lottery-number normal">${num}</div>`
    ).join('');
    
    if (specialNumber) {
        numbersHtml += `<div class="lottery-number special">${specialNumber}</div>`;
    }
    
    resultArea.innerHTML = `
        <h4><i class="fas fa-star"></i> ${lotteryName} 號碼</h4>
        <div class="lottery-numbers">${numbersHtml}</div>
        <p style="font-size: 14px; opacity: 0.8; margin-top: 15px;">
            ${specialNumber ? '最後一個是威力彩號碼' : ''}
            祝你好運！ <i class="fas fa-clover"></i>
        </p>
    `;
}

// Enter 鍵支援
document.getElementById('excludeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addExcludeNumber();
    }
});

document.getElementById('preferInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addPreferNumber();
    }
});

// 初始化
updateInputRanges();
