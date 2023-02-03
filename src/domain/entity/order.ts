/*
    Objeto agregado, temos que olhar o seguinte, caso tenhamos um objeto pertecente ao agregdo
    tempos que relacionar pelo objeto, caso temo alguma relação com outro agregado fazemos a referencia
    somente pelo id, neste caso aqui, a referencia é _customerId, que pertence a outro agregado.
*/

import OrderItem from "./order_items";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id=id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    get id(){
        return this._id;
    }
    get customerId(): string {
        return this._customerId;
    }
    
    get items(): OrderItem[] {
        return this._items;
    }

 

    validate(): boolean {
        if(this._id.length === 0) {
            throw new Error("Id is required");
        }
        if(this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if(this._items.length === 0) {
            throw new Error("Items qte must be greater than 0");
        }
        if(this._items.some(item=>item.quantity <=0)) {
            throw new Error("Quantity must be greater than 0");
        }
        return true;
    }
    total(): number {
       return this._items.reduce((acc, item)=> acc+item.orterItemTotal(), 0);
    }
}