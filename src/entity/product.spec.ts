import Product from "./Product";

describe("Product Unit Test", ()=> {
   
    it("Should throw error When id is empty", ()=>{
        expect(()=>{
            const product = new Product("", "Product 1", 200);
        }).toThrowError("Id is required");
        
    });

    it("Should throw error When name is empty", ()=>{
        expect(()=>{
            const product = new Product("1", "", 200);
        }).toThrowError("Name is required");
        
    });
    
    it("Should throw error When price less than zero", ()=>{
        expect(()=>{
           const product = new Product("1", "name", -200);
        }).toThrowError("Price must be grater than zero");
        
    });

       
    it("change name", ()=>{
        const product = new Product("1", "name", 200);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("change price", ()=>{
        const product = new Product("1", "name", 200);
        product.changePrice(300);
        expect(product.price).toBe(300);
    });
})