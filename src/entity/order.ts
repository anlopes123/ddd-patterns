/*
    Objeto agregado, temos que olhar o seguinte, caso tenhamos um objeto pertecente ao agregdo
    tempos que relacionar pelo objeto, caso temo alguma relação com outro agregado fazemos a referencia
    somente pelo id, neste caso aqui, a referencia é _customerId, que pertence a outro agregado.
*/

import OrderItem from "./order_items";

export default class Order {
    _id: string;
    _customerId: string;
    _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id=id;
        this._customerId = customerId;
        this._items = items;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc+item._price, 0);
    }
}