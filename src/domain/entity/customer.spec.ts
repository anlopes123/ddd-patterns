import Address from "./address";
import Customer from "./customer";

describe("Customer Unit test", ()=>{
    it("Shoud throw error when id is empty", ()=>{
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");
    });
    it("Shoud throw error when name is empty", ()=>{
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });
    it("Shoud change name", ()=>{
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("Shoud activate customer", ()=>{
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "123745-456", "São Paulo");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("Shoud deactivate customer", ()=>{
        const customer = new Customer("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("Shoud throw error when adrress undefined when you activate a customer", ()=>{
        expect(() => {
            let customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", ()=>{
        const customer = new Customer("c1", "José");
        expect(customer.rewardPoint).toBe(0);

        customer.addRewardPoint(10);
        expect(customer.rewardPoint).toBe(10);

        customer.addRewardPoint(10);
        expect(customer.rewardPoint).toBe(20);

    })

});