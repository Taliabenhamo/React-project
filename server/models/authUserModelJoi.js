const joi = require('joi');


class AuthUserModelJOI {
    constructor(object) {
        this.user_id=object.user_id;
        this.firstName = object.firstName;
        this.middleName = object.middleName;
        this.lastName = object.lastName;
        this.email = object.email;
        this.phone = object.phone;
        this.password = object.password;
        this.imageUrl=object.imageUrl;
        this.imageAlt=object.imageAlt;
        this.state = object.state;
        this.country = object.country;
        this.city = object.city;
        this.street = object.street;
        this.houseNum = object.houseNum;
        this.zip = object.zip;
        this.isAdmin=object.isAdmin;
  

        
     
    }
    static #baselineValidation = {
        user_id:joi.string(),
        isAdmin:joi.boolean(),
        firstName: joi.string().required().min(3).max(20),
        middleName: joi.string().min(3).max(20).allow(""),
        lastName: joi.string().required().min(3).max(20),
        email: joi.string().required().email().min(6).max(50),
        phone: joi.string().required(),
        password: joi
            .string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/)
            .required()
            .min(8)
            .max(12),

        imageUrl: joi.string().min(11).max(1024).allow(""),
        imageAlt: joi.string().min(2).max(1024).allow(""),
        state: joi.string().min(2).max(20).allow(""),
        country: joi.string().min(2).max(30),
        city: joi.string().min(2).max(30),
        street: joi.string().min(2).max(30),
        houseNum: joi.string().min(1).max(15),
        zip: joi.string().min(4).max(9),

        
        
     
    };
    static #registerValidation = joi
        .object(AuthUserModelJOI.#baselineValidation)
        .keys({ id: joi.string().forbidden() });

    static #loginValidation = joi
        .object(AuthUserModelJOI.#baselineValidation)
        .keys({ firstName: joi.string().forbidden() })
        .keys({ lastName: joi.string().forbidden() })
        .keys({ phone: joi.string().forbidden() });

    validateRegistration() {
        const result = AuthUserModelJOI.#registerValidation.validate(this, {
            abortEarly: false,
        });

        return result.error ? result.error : null;
    }

    validateLogin() {
        const result = AuthUserModelJOI.#loginValidation.validate(this, {
            abortEarly: false,
        });

        return result.error ? result.error : null;
    }
}

module.exports = AuthUserModelJOI;
