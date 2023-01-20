import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/product";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository-interface";
import CustomerModel from "../db/sequelize/model/customer.model";

import ProductModel from "../db/sequelize/model/product.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoint,

        });
    };
    async update(entity: Customer): Promise<void>{
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoint,

        },{
            where: {id: entity.id}
        });

    };
    async find(id: string): Promise<Customer>{
       let customerModel 
       try {
         customerModel =     await CustomerModel.findOne({where: { id: id },
          rejectOnEmpty: true });
       } catch (error) {
         throw new Error("Customer not found");
       }

       let customer = new Customer(customerModel.id, customerModel.name);
       let addres = new Address(
        customerModel.street, 
        customerModel.number, 
        customerModel.zipcode, 
        customerModel.city
        );
       customer.changeAdrress(addres);
       return customer;
    };
    async findAll(): Promise<Customer[]>{
        const productModels = await ProductModel.findAll();
        return productModels.map((productModel) => 
            new Product(productModel.id, productModel.name, productModel.price)
        );
    };
}