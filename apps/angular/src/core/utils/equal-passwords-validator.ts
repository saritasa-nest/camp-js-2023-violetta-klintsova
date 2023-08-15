import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Checks whether two strings in a form are equal.
 * @param mainField Main field, whose value is the one to be compared with.
 * @param secondaryField Secondary field.
 */
export function equalityValidator(mainField: string, secondaryField: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const main = control.get(mainField);
		const secondary = control.get(secondaryField);

		if (main !== null && secondary !== null && main.value !== secondary.value) {
			control.get(secondaryField)?.setErrors({ matchError: true });
		} else {
			control.get(secondaryField)?.setErrors(null);
		}

		return null;
	};
}
