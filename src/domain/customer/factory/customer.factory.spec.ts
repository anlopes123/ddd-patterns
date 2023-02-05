import Address from "../value_object/address";
import CustomerFactory from "./customer.factory";


describe("Customer factory unit test", () =>{
   it("Should create a customer", ()=>{
        const customer = CustomerFactory.create("Jhon");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBeUndefined();
   });

   
   it("Should create a customer with address", () =>{
    const address = new Address("Street", 123, "74230-230", "Go");
    let customer = CustomerFactory.createWithAddress("Jhon", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.address).toBe(address);
});
});