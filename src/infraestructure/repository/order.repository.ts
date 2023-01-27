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
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
          await OrderItemModel.destroy({
            where: { order_id: entity.id },
            transaction: t,
          });
          const items = entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          }));
          await OrderItemModel.bulkCreate(items, { transaction: t });
          await OrderModel.update(
            { total: entity.total() },
            { where: { id: entity.id }, transaction: t }
          );
        });
    }
    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: {id: id},
            include: ["items"],
        });       
        let orderItems : OrderItem[];
        orderModel.items.forEach((item)=> {
             const orit = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
             orderItems.push(orit);   
        });        
        return  new Order(orderModel.id, orderModel.customer_id, orderItems);
            
    }
    async findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    
}