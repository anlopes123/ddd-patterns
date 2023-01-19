import{Sequelize} from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
describe("Product repository unit test", ()=>{
    let sequelize: Sequelize;
    beforeEach(async ()=> {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},            
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async ()=>{
        await sequelize.close();
    });

    it("Should create a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1","Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1" } });
        
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });
    }); 
    it("Should update a product", async()=>{
        const productRepository = new ProductRepository();
        const product = new Product("1","Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1" } });
        
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel1 = await ProductModel.findOne({where: { id: "1" } });
        
        expect(productModel1.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200,
        });


    });

    it("Should find a product", async() => {
        const productRepository = new ProductRepository();
        const product = new Product("1","Product 1", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1" } });
        const findProduct = await productRepository.find("1");
        expect(productModel.toJSON()).toStrictEqual({
            id: findProduct.id,
            name: findProduct.name,
            price: findProduct.pricessssss,
        });

    })
});