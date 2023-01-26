import { where } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

import ProductModel from "../db/sequelize/model/product.model";

export default class OrderRepository implements OrderRepositoryInterface  {

    
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id : entity.customerId,
            total: entity.total(),
            items: entity.items.map((item)=>({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
         

        },
        {
            include: [{model: OrderItemModel}],
        });
    };

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            id: entity.id,
            customer_id : entity.customerId,
            total: entity.total(),
            items: entity.items.map((item)=>({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })), 

        },
        {
            where: {id: entity.id},          
        
        });
    }
    find(id: string): Promise<Order> {
        const orderModel =  await OrderModel.findOne({
            where: { id: id },
            include: [{model: OrderItemModel}],
           });
           let items = OrderItem[];
        orderModel.items.forEach((item)=>({
            const oi = new OrderItem(item.id, 
                item.name,
                item.quantity,
                item.price,
                item.product_id,                 
            ),
            
            items.push(oi);                
        }));    
        return new Order(orderModel.id, orderModel.customer_id, items);
            
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    
}