import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Checks whether two strings in a form are equal.
 * @param controlOne First field.
 * @param controlTwo Second field.
 */
export function equalityValidator(controlOne: string, controlTwo: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const valueOne = control.get(controlOne);
		const valueTwo = control.get(controlTwo);

		if (valueOne !== null && valueTwo !== null && valueOne.value !== valueTwo.value) {
			control.get(controlTwo)?.setErrors({ matchError: true });
		} else {
			control.get(controlTwo)?.setErrors(null);
		}

		return null;
	};
}
