
import Address from "../value_object/address";
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
        customer.changeAdrress(address);
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

    });
    it("should notify event customer created", ()=>{

      const spyEventHandler= jest.spyOn(Customer.getEventHandler1(), "handler");
      const spyEventHandler1= jest.spyOn(Customer.getEventHandler2(), "handler");
      const customer = new Customer("1", "Client 1");
        
       expect(spyEventHandler).toHaveBeenCalled();
       expect(spyEventHandler1).toHaveBeenCalled();
    });

    it("should notify event customer changeAdress", ()=>{

        const spyEventHandler= jest.spyOn(Customer.getEventHandlerChangeAdress(), "handler");
        const customer = new Customer("1", "Client 1");
        const addrees = new Address("Rua H", 1, "74937-230", "Goiânia");
        customer.changeAdrress(addrees);  
        expect(spyEventHandler).toHaveBeenCalled();         
      });

});