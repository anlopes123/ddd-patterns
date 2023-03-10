import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository-interface";
import Address from "../../../../domain/customer/value_object/address";
import CustomerModel from "./customer.model";

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
        const customerModels = await CustomerModel.findAll();
        const customers = customerModels.map((customerModels) => {
            let customer = new Customer(customerModels.id, customerModels.name);
            customer.addRewardPoint(customerModels.rewardPoints);
            const address = new Address(
                customerModels.street,
                customerModels.number,
                customerModels.zipcode,
                customerModels.city,
            );
            customer.changeAdrress(address);
            if(customerModels.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    };
}