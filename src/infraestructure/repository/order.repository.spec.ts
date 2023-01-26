import{Sequelize} from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository unit test", ()=>{
    let sequelize: Sequelize;
    beforeEach(async ()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("Should create a new order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer1");
        const adrress = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAdrress(adrress);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            2,
            product.price,
            product.id
        );

        const order = new Order("123", customer.id, [orderItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            customer_id: customer.id,           
            id: "123",
            items: [
              {
                id: orderItem.id,
                name: orderItem.name,
                order_id: "123",
                price: orderItem.price,
                product_id: "123",
                quantity: orderItem.quantity,               
             
              }],
            total: order.total(),
        });
        
    });
    it("Should update a order",async () => {
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer1");
        const adrress = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAdrress(adrress);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            2,
            product.price,
            product.id
        );

        const order = new Order("123", customer.id, [orderItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"],
        });

        const orderItemUpdate = new OrderItem("1", "Product 1", 2, 20, "123")
        const orderUpdate = new Order("123", "123", [orderItemUpdate]);

        await orderRepository.update(order);

        const orderUpdateModel = await OrderModel.findOne({
            where: {id: orderUpdate.id},
            include: ["items"],
        });


        expect(orderUpdateModel.toJSON()).toStrictEqual({
            customer_id: customer.id,           
            id: "123",
            items: [
              {
                id: orderItemUpdate.id,
                name: orderItemUpdate.name,
                order_id: "123",
                price: orderItemUpdate.price,
                product_id: "123",
                quantity: orderItem.quantity,               
             
              }],
            total: orderUpdate.total(),
        });


    })

   
});