
type CreateAccountValues = { name: string, email: string, password: string }
type SignInValues = { email: string, password: string }
type CreateProductValues = { name: string, price:number, company:string, description: string, url: string} 
export function validateCreateAccount(values : CreateAccountValues ) {
    let errors : any =  {};

    if(!values.name){
        errors.name = "Field name must be provided";
    }
    if(!values.email){
        errors.email = "Field email must be provided";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "That's not a valid email";
    }
    if(!values.password){
        errors.password = "Field password must be provided";
    } else if(values.password.length < 6){
            errors.password = "Password must have at least 6 characters";
    }
    return errors;
}

export function validateLogin(values: SignInValues){

    const errors : any = {};

    if(!values.email){
        errors.email = "Email is required";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = "Invalid Email";
    }
    if(!values.password){
        errors.password = "Password is required";
    } else if(values.password.length < 6){
            errors.password = "Password has at least 6 characters";
    }

    return errors;
}

export function validateCreateProduct(values : CreateProductValues ) {
    let errors : any =  {};

    if(!values.name){
        errors.name = "Field name must be provided";
    }
    if(!values.company){
        errors.company = "Field company must be provided";
    }
    if(!values.url){
        errors.url = "Field url must be provided";
    }
    else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
            errors.url = "That's not a valid URL";
    }
    if(!values.description){
        errors.description = "Field description must be provided";
    }
    return errors;

}