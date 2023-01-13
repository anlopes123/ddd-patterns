import Address from "./address";

/*
   Esta entidade é focada em negócio não precisa ter getters e setters, somente 
   o que faz sentido para o seu negócio.
 */
export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _activate: boolean = true;

    get name(): string {
        return this._name;
    }
    get Address(): Address {
        return this._address;
    }

    set Address(address: Address) {
        this._address = address;
    }

    constructor(id: string, name: string) {
        this._id=id;
        this._name=name;
        this.validate();
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