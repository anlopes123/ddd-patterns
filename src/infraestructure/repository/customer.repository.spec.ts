import{Sequelize} from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit test", ()=>{
    let sequelize: Sequelize;
    beforeEach(async ()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("Should create a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Cutomer 1");
        const address = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer.changeAdrress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: { id: "1" } });
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoint,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
    }); 
    it("Should update a Customer", async()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Cutomer 1");
        const address = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer.changeAdrress(address);
        await customerRepository.create(customer);

        customer.changeName("customer Update");
       

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: { id: "1" } });
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoint,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });


    });

    // it("Should find a product", async() => {
    //     const productRepository = new ProductRepository();
    //     const product = new Product("1","Product 1", 100);
    //     await productRepository.create(product);

    //     const productModel = await ProductModel.findOne({where: { id: "1" } });
    //     const findProduct = await productRepository.find("1");
    //     expect(productModel.toJSON()).toStrictEqual({
    //         id: findProduct.id,
    //         name: findProduct.name,
    //         price: findProduct.price,
    //     });

    // });
    // it("shold find all a product", async() => {
    //     const productRepository = new ProductRepository();
    //     const product = new Product("1", "Product 1",  100);
    //     await productRepository.create(product);
    //     const product1 = new Product("2", "Product 2",  200);
    //     await productRepository.create(product1);

    //     const foundProducts = await productRepository.findAll();
    //     const products = [product, product1];

    //     expect(products).toEqual(foundProducts);
    // });
});