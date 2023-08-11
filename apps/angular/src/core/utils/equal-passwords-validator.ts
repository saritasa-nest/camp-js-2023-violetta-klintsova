import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Checks whether the password and confirmed password are equal.
 * @param control Form which validator is assigned to.
 */
export const equalPasswordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const password = control.get('password');
	const confirmedPassword = control.get('confirmedPassword');

	return password && confirmedPassword && (password.value !== confirmedPassword.value) ? { matchError: true } : null;
};
