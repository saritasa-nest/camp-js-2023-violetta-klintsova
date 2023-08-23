import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Checks whether two strings in a form are equal.
 * @param mainControlName Main field, whose value is the one to be compared with.
 * @param secondaryControlName Secondary field.
 */
export function equalityValidator(mainControlName: string, secondaryControlName: string): ValidatorFn {
	return (formGroup: AbstractControl): ValidationErrors | null => {
		const mainControl = formGroup.get(mainControlName);
		const secondaryControl = formGroup.get(secondaryControlName);

		if (mainControl == null || secondaryControl == null) {
			throw new Error('No control with provided name was found.');
		}

		if (mainControl?.value !== secondaryControl?.value) {
			formGroup.get(secondaryControlName)?.setErrors({ matchError: true });
		} else {
			formGroup.get(secondaryControlName)?.setErrors(null);
		}

		return null;
	};
}
