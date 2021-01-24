const placeholder = 'images/placeholder.png';

const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img = placeholder) => {
    return `<div class="product-item">
                <div class="product-img">
                <img src="${img}" alt="${title}">
                </div>
                <div class="product-info">
                    <h3>${title}</h3>
                    <p>${price.toLocaleString('ru-RU')} RUB</p>
                    <button class="by-btn">Add to Cart</button>
                </div>
              </div>`;
};

const renderProducts = (list) => {

    const productListElement = document.querySelector('.products');
    list.forEach((product) => {
        productListElement.insertAdjacentHTML('beforeend', renderProduct(product.title, product.price))
    });
};

renderProducts(products);
