import { where } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_items";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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
                order_id: entity.id,
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
        let orderItems : Array<OrderItem> = [];
        orderModel.items.forEach((item)=> {
             const orit = new OrderItem(item.id, item.name, item.quantity, item.price, item.product_id);
             orderItems.push(orit);   
        });        
        return  new Order(orderModel.id, orderModel.customer_id, orderItems);
            
    }
    async findAll(): Promise<Order[]> {
        const ordersModels = await OrderModel.findAll({include:["items"]});
        let orders : Order[]= [];       
        ordersModels.forEach((orderModel) =>{
            let orderItems : OrderItem[] = [];
            orderModel.items.forEach((orderItemModel) =>{
                let orderItem = new OrderItem(orderItemModel.id, 
                             orderItemModel.name,                              
                             orderItemModel.quantity,
                             orderItemModel.price, 
                             orderItemModel.product_id);
                orderItems.push(orderItem);
            });
            let order = new Order(orderModel.id, orderModel.customer_id, orderItems);
            orders.push(order);        
        });
        return orders;
    }
    
}