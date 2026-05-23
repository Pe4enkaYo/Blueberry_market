function createProductCard(product) {
    const photo = product.photo && product.photo !== 'null' ? product.photo : 'https://via.placeholder.com/200';
    return `
        <a href="/product/${product.id}" class="product-card">
            <img class="product-image" src="${photo}" alt="${product.name}">
            <div class="product-info">
                <div class="product-name">${escapeHtml(product.name)}</div>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="product-brand">${escapeHtml(product.brand || '')}</div>
            </div>
        </a>
    `;
}
function createPaiment_box(product) {
    const photo = product.photo && product.photo !== 'null' ? product.photo : 'https://via.placeholder.com/200';
    return `
        <div class="product-card">
            <img class="product-image" src="${photo}" alt="${product.name}">
        </div>
        <div>
            <p> Тут будет описание</p>
        </div>
        <div class="paiment-box">
                <div class="product-price">${product.price.toLocaleString()} ₽</div>              
        </div>

    `;
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

        // Загрузка данных
async function loadForYou() {
    try {
        const response = await fetch('/api/recommendations');
        const data = await response.json();
        document.getElementById('forYouCards').innerHTML = data.map(createProductCard).join('');
    } catch (error) {
        console.error('Ошибка "Для вас":', error);
        document.getElementById('forYouCards').innerHTML = '<p style="color: red;">Ошибка загрузки</p>';
    }
}

async function loadHits() {
    try {
        const response = await fetch('/api/hits');
        const data = await response.json();
        document.getElementById('hitsCards').innerHTML = data.map(createProductCard).join('');
    } catch (error) {
        console.error('Ошибка "Хиты":', error);
        document.getElementById('hitsCards').innerHTML = '<p style="color: red;">Ошибка загрузки</p>';
    }
}

async function loadAllProducts() {
    try {
        const response = await fetch('/api/all');
        const data = await response.json();
                
        // Если data — это массив (как у тебя)
        if (Array.isArray(data)) {
            document.getElementById('allProducts').innerHTML = data.map(createProductCard).join('');
        }
        // Если data — это объект с полем items
        else if (data.items && Array.isArray(data.items)) {
            document.getElementById('allProducts').innerHTML = data.items.map(createProductCard).join('');
        }
        else {
            console.error('Неожиданный формат данных:', data);
            document.getElementById('allProducts').innerHTML = '<p style="color: red;">Ошибка формата данных</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        document.getElementById('allProducts').innerHTML = '<p style="color: red;">Ошибка загрузки</p>';
    }
}

        // Поиск
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value;
            if (query.trim()) {
                searchProducts(query);
            } else {
                loadAllProducts();
            }
        }, 300);
    });
}

async function searchProducts(query) {
    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        document.getElementById('allProducts').innerHTML = data.map(createProductCard).join('');
        document.getElementById('pagination').innerHTML = '';
    } catch (error) {
        console.error('Ошибка поиска:', error);
    }
}

        // Запуск при загрузке
loadForYou();
loadHits();
loadAllProducts();
setupSearch();