import Address from "./address";

/*
   Esta entidade é focada em negócio não precisa ter getters e setters, somente 
   o que faz sentido para o seu negócio.
 */
export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _activate: boolean = true;

    constructor(id: string, name: string) {
        this._id=id;
        this._name=name;
        this.validate();
    }

    validate() {
        if(this._name.length == 0) {
            throw new Error("Name is required");
        }

        if(this._id.length == 0 ) {
            throw new Error("Id is required")
        }
        
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        this._activate = true;
    }

    deactivate() {
        this._activate= false;
    }





}