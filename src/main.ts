import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer"
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_items";

//Agregado de Customer.
let customer = new Customer("1", "Anizair Lopes");
const address = new Address("Rua dois", 2, "74937230","Aparecida de Goiânia" );
customer._address = address;
customer.activate();

//Agregado de Oreder
//relacionamento com agregado de customer atreves de um Id
//relacionamento dentro do mesmo agregado atraves de Entity
const item1 = new OrderItem("1", "item 1", 10);
const item2 = new OrderItem("2", "item 2", 15);
const order = new Order("1", "123", [item1, item2]);



