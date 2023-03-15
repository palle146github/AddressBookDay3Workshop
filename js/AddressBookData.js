class AddressBookData{
    get id() {return this._id;}
    set id(id){this._id = id;}
    
    get name(){return this._name;}

    set name(name){
        let nameRegex = RegExp("^[A-Z]{1}[a-zA-z\\s]{2,}$");
        if(nameRegex.test(name)){
            this._name = name;
        }
        else throw "Name is Incorrect";
    }

        // get address() {return this._address;}
        // set address(address){
        //     this._address = address;
        // }
        // ^(?=.*\S)[a-zA-Z0-9]{3,}(?:\s+[a-zA-Z0-9]{3,})+$
        // ^(?=.*[a-zA-Z0-9])\w{3,}(?:\s+\w{3,})+$
        // (?=.*\S)[a-zA-Z0-9]{3,}(\s+[a-zA-Z]{3,})+$
        // ^[a-zA-Z0-9]{3,}\\s+([a-zA-Z0-9]{3,}\\s*)+$
        // ^[a-zA-Z0-9,-.]{3,}\\s+([a-zA-Z0-9,-.]{3,}\\s*)+$
        // ^[a-zA-Z0-9,-.]{3,}\\s+([a-zA-Z0-9,-.]{3,}\\s*)+$
        get address() {return this._address;}
        set address(address){
        let addressRegex = RegExp("^[a-zA-Z0-9]{3,}\\s+([a-zA-Z0-9]{3,}\\s*)+$");
            if(addressRegex.test(address)){
                this._address = address;
            }
            else throw "Address is Incorrect";
        }
        get citySelect() {return this._citySelect;}
        set citySelect(citySelect){
            this._citySelect = citySelect;
        }


        get stateSelect() {return this._stateSelect;}
        set stateSelect(stateSelect){
            this._stateSelect = stateSelect;
        }

        set zip(zip){
            let zipRegex = RegExp("^[1-9]{1}[0-9]{5}$");
            if(zipRegex.test(zip)){
                this._zip = zip;
            }
            else throw "Zip is Incorrect";
        }


        // get zip() {return this._zip;}
        // set zip(zip){
        //     this._zip = zip;
        // }


        // get scz() {return this._scz;}
        // set scz(scz){
        //     this._scz = scz;
        // }
        // 
        // ^[\+|91]{0,1}[1-9]{1}[0-9]{9}$
        // ^[\+]?[91]?[1-9][0-9]{9}$
        get phone() {return this._phone;}
        set phone(phone){
        let nameRegex = RegExp("^[\+]?([0-9]{2})?[1-9]{1}[0-9]{9}$");
            if(nameRegex.test(phone)){
                this._phone = phone;
            }
            else throw "Number is Incorrect";
        }
        toString(){
            return "id=" + this.id + ", fullname= " + this.name + ", address=" + this.address + ", city=" + this.citySelect + ", state=" + this.Select + ", zipCode=" + this.zip + ", phoneNumber=" + this.phone;        
        }
}




