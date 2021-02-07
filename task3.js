
class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };

        this.errorClass = 'error-block';
        this.form = document.getElementById(form);
        this.valid = false;
        this.btn = document.getElementById('val-btn');
        this._validateForm();
    }


    _validateForm() {
        let formFields = [...this.form.getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if(this._isValid()){
            this.valid = true;
        }
    }
    _isValid(){
        if(![...this.form.querySelectorAll('.invalid')].length){
            return true;
        } else {
            return false;
        }

    }

    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
                this._watchField(field);
                this.btn.disabled = true;
            }
        }
    }

    _addErrorMsg(field) {
        this.form.querySelector(`#${field.name}Err`).textContent = this.errors[field.name];
    }

    _removeErrorMsg(field){
        this.form.querySelector(`#${field.name}Err`).textContent = '';
    }

    _watchField(field){
        field.addEventListener('input', () => {
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                this._removeErrorMsg(field);
                if (this._isValid()) this.btn.disabled = false;
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                this._addErrorMsg(field);
            }
        });
    }


}