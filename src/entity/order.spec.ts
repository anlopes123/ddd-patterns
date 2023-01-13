import Order from "./order";
import OrderItem from "./order_items";

describe("Order unit test", () => {

    it("Shoud throw error when id is empty", () =>{
        expect(() =>{
           let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("Shoud throw error when customerId is empty", () =>{
        expect(() =>{
           let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("Shoud throw error when Items is 0", () =>{
        expect(() =>{
           let order = new Order("1", "123", []);
        }).toThrowError("Items qte must be greater than 0");
    });

    it("Shoud calculate total", () =>{
        const item = new OrderItem("i1", "Item 1", 100);
        const item1 = new OrderItem("i2", "Item 1", 200);
        const order = new Order("o1", "c1", [item]);
        let total = order.total();
        expect(total).toBe(100);

        const order1 = new Order("o2", "c2", [item, item1]);
        total = order1.total();
        expect(total).toBe(300);
    });

})