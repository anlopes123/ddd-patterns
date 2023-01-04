
/* 
  Esta entidade é focada em persistência que será utilizada pelo ORM para persistir dados
  por isso tem metodos getters e setters
*/
class Customer {
    _id: string;
    _name: string;
    _address: string;
    _activate: boolean = true;

    constructor(id: string, name: string, address: string) {
        this._id=id;
        this._name=name;
        this._address=address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address() : string {
        return this._address;
    }

    get activate() : boolean {
        return this._activate;
    }

    set id(id: string) {
        this._id = id;
    }
    set name(name: string) {
        this._name = name;
    }
    set address(address: string){
        this._address = address;
    }

    set activate(activate: boolean) {
        this._activate = activate;
    }


}