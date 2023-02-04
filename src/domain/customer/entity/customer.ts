import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAdressEvent from "../event/customer-changeAdress.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLogHandler from "../event/handler/send-console-log-when-customer-changeAdress.handler";
import EnviaConsoleLog1Handler from "../event/handler/send-console-log1-when-customer-created.handle";
import EnviaConsoleLog2Handler from "../event/handler/send-console-log2-when-customer-created.handler";
import Address from "../value_object/address";


/*
   Esta entidade é focada em negócio não precisa ter getters e setters, somente 
   o que faz sentido para o seu negócio.
 */
export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _activate: boolean = true;
    private _rewardPoint : number = 0;
    private _eventDispatcher : EventDispatcher;
    private static _eventHandler1: EnviaConsoleLog1Handler;
    private static _eventHandler2: EnviaConsoleLog2Handler;
    private static _eventHandlerAdress: EnviaConsoleLogHandler;

    get name(): string {
        return this._name;
    }
    get address(): Address {
        return this._address;
    }

    get id() : string {
        return this._id;
    }

    static getEventHandler1() {
        return Customer._eventHandler1 = new EnviaConsoleLog1Handler();
    }
    static getEventHandler2() {
        return Customer._eventHandler2 = new EnviaConsoleLog2Handler();
    }

    static getEventHandlerChangeAdress() {
        return Customer._eventHandlerAdress = new EnviaConsoleLogHandler();
    }

    changeAdrress(addrees: Address) {
        this._address= addrees;
        this._eventDispatcher.register("CustomerChangeAdressEvent", Customer._eventHandlerAdress);
        const customerChangeAdressEvent = new CustomerChangeAdressEvent({
            id: this._id,
            name: this._name,
            endereco: this._address.toString(),
        })
        this._eventDispatcher.notify(customerChangeAdressEvent);
    }

    constructor(id: string, name: string) {
        this._id=id;
        this._name=name;
        this.validate();
        this._eventDispatcher = new EventDispatcher();
        // Customer._eventHandler1 = new EnviaConsoleLog1Handler();
        // Customer._eventHandler2 = new EnviaConsoleLog2Handler();        
        this._eventDispatcher.register("CustomerCreatedEvent", Customer._eventHandler1);
        this._eventDispatcher.register("CustomerCreatedEvent", Customer._eventHandler2);
        
       

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: this._id,
            name: this._name,
         });

         this._eventDispatcher.notify(customerCreatedEvent);

   
   
    }

    isActive(): Boolean {
        return this._activate;
    }

    validate() {
        if(this._id.length == 0 ) {
            throw new Error("Id is required")
        }

        if(this._name.length == 0) {
            throw new Error("Name is required");
        }
        
    }
    get rewardPoint(): number {
        return this._rewardPoint;
    }

    addRewardPoint(points: number) {
        this._rewardPoint += points;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
           throw new Error("Address is mandatory to activate a customer");
        }
        this._activate = true;
    }

    deactivate() {
        this._activate= false;
    }





}