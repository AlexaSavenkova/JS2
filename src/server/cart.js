// добавила пересчет общей суммы и количества наименований в файле userCart.json


const add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods += 1;
    return { name: req.body.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cart.amount += find.price * req.body.quantity;
    return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
};

const remove = (cart, req) => {
    if (req.params.id === 'all') {
        cart.countGoods = 0;
        cart.amount = 0;
        cart.contents = [];
        return { name: 'All cart items', newCart: JSON.stringify(cart, null, 4) };
    } else {
        const find = cart.contents.find(el => el.id_product === +req.params.id);
        cart.countGoods -= 1;
        cart.amount -= find.price;
        cart.contents.splice(cart.contents.indexOf(find), 1);
        return { name: find.product_name, newCart: JSON.stringify(cart, null, 4) };
    }

};

module.exports = {
    add,
    change,
    remove,
};
