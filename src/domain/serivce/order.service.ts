import Customer from "../domain/entity/customer";
import Order from "../domain/entity/order";
import OrderItem from "../domain/entity/order_items";
import {v4 as uuid} from "uuid";

export default class OrderService {

   static placeOrder(customer: Customer, items: OrderItem[]): Order {
      if (items.length === 0) {
        throw new Error("Order must have at last one item");
      }

      const order = new Order(uuid(), customer.id, items);
      customer.addRewardPoint(order.total()/2);
      return order;
   }

    static total(orders : Order[]) : number {
        return orders.reduce((acc, order)=>acc+order.total(), 0);
    }

}