import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

/** Authentication module. */
@NgModule({
	declarations: [SignUpComponent, LogInComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
})
export class AuthModule {}
