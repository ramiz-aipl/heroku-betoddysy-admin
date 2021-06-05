//Original version created by Cory Rylan: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
import { AbstractControl, FormGroup } from '@angular/forms';
// import { CommonService } from './common.service';
// import { ErrorLogService } from './error-log.service';

export class ValidationService {
    // constructor(
    //     private commonService: CommonService,
    //     private errorLogService: ErrorLogService
    // ) { }
    static getValidatorErrorMessage(code: string, validatorValue?: any) {
        let config = {
            'required': `This field is required`,
            'invalidNumber': 'Only number allowed',
            'invalidMatchPassword': 'Password does not matched',
            'EitherOrReuired': 'Any One Email Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Password must be at least 6 to 10 characters long, and contain a numbers, uppercase, lowercase, special characters.',
            'minlength': `Minimum ${validatorValue.requiredLength} digit allowed`,
            'maxlength': `Maximum ${validatorValue.requiredLength} digit allowed`
        };
        return config[code];
    }

    static creditCardValidator(control: AbstractControl) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        if (control.value) {
            if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                return null;
            } else {
                return { 'invalidEmailAddress': true };
            }
        } else {
            return null;
        }
    }
    static emailMultipleValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        if (control.value) {
            var emailArray = control.value.split(",");
            var Check = null;
            for (var val of emailArray) {
                if (val.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {

                } else {
                    Check = true
                }
            }
            if (Check) {
                return { 'invalidEmailAddress': true };
            } else {
                return null;
            }

        } else {
            return null;
        }
    }

    static passwordValidator(control: AbstractControl) {
        // {6,10}           - Assert password is between 6 and 10 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,10}$/)) {

        // At least 6 to 10 characters in length
        // Lowercase letters
        // Uppercase letters
        // Numbers
        // Special characters
        if (control.value) {
            if (control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/)) {
                return null;
            } else {
                return { 'invalidPassword': true };
            }
        } else {
            return null;
        }
    }

    static numberValidator(control: AbstractControl) {
        // Only number allows
        if (control.value) {
            if (control.value.match(/^-?[\d.]+(?:e-?\d+)?$/)) {
            } else {
                return { 'invalidNumber': true };
            }
        } else {
            return null;
        }

    }

    // SeverValidationEmail(control: AbstractControl) {
    //     if (control.get('Email').value) {
    //         this.commonService.addData('auth/email-validation', { Email: control.get('Email').value, UserID: control.get('UserID').value }).subscribe(
    //             response => {
    //                 if (response.status) {
    //                     if (response.data) {
    //                         return { 'EmailAlreadyUsing': true };
    //                     } else {
    //                         return null;
    //                     }
    //                 }
    //             },
    //             error => this.errorLogService.handleError(error)
    //         )
    //     } else {
    //         return null;
    //     }
    // }
    static matchPasswordValidator(control: AbstractControl) {
        // Match password
        if (control.get('Password').value && control.get('ConfirmPassword').value) {
            if (control.get('Password').value === control.get('ConfirmPassword').value) {
                return null;
            } else {
                return { 'invalidMatchPassword': true };
            }
        } else if (control.get('Password').value) {
            return { 'required': true };
        } else {
            return null;
        }

    }
    static EitherOrReuired(control: AbstractControl) {
        // Match password
        if (control.get('ReferringPhysician').value || control.get('PatientEmail').value || control.get('AddressEmail').value) {
            return null;
        } else {
            return { 'EitherOrReuired': true };
        }

    }
    
    // static NoOfCartonsOrReuired(control: AbstractControl) {
    //     // Match password
    //     if (control.get('Status').value && control.get('Status').value == '1') {
    //         return null;
    //     } else {
    //         return { 'NoOfCartons': true };
    //     }

    // }
    
    // static ReasonOrReuired(control: AbstractControl) {
    //     // Match password
    //     if (control.get('Status').value && control.get('Status').value == '2') {
    //         return null;
    //     } else {
    //         return { 'Reason': true };
    //     }

    // }

    // static markFormGroupTouched(formGroup: FormGroup) {
    //     Object.values(formGroup.controls).forEach(control => {
    //         control.markAsTouched();
    //         if (Array.isArray(control['controls']) && control['controls']) { //FormGroup
    //             control['controls'].forEach(c => this.markFormGroupTouched(c));
    //         } else if (control['controls']) {
    //             Object.values(<FormGroup>control['controls']).forEach(c => {
    //                 c.markAsTouched();
    //             });
    //         }
    //     });
    // }
}