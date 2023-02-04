import{Sequelize} from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value_object/address";

import CustomerModel from "./customer.model";
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
            active: customer.isActive(),
            rewardPoints: customer.rewardPoint,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });


    });

    it("Should find a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1","Cutomer 1");
        const address = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer.changeAdrress(address);
        await customerRepository.create(customer);

        const constomerResult = await customerRepository.find(customer.id);
        expect(customer).toEqual(constomerResult);

    });

    it("Should throw an error when customer is not found", async()=>{
        const customerRepository = new CustomerRepository();
        expect(async() =>{
            await customerRepository.find("456ABC");
        }).rejects.toThrow("Customer not found");
    })
    it("shold find all a customer", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "zipcode 1", "City 1");
        customer.changeAdrress(address);
        customer.activate();

        await customerRepository.create(customer);
        const customer1 = new Customer("2", "Customer 2");
        const address1 = new Address("Street 2", 1, "zipcode 2", "City 2");
        customer1.changeAdrress(address1);
        customer1.addRewardPoint(20);
        await customerRepository.create(customer1);

        const customers = await customerRepository.findAll();
        
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer);
        expect(customers).toContainEqual(customer1);
        
    });
});