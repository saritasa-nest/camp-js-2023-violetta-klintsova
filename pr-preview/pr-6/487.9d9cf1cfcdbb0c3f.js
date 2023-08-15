"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[487],{9487:(ve,E,u)=>{u.r(E),u.d(E,{AuthModule:()=>he});var h=u(89),s=u(6284),v=u(2074),c=u(8640),y=u(1300),C=u(6502),A=u(3568),T=u(9018),e=u(4355),L=u(7241),O=u(3528);function w(r){r||((0,e.gHi)(w),r=(0,e.f3M)(e.ktI));const t=new L.y(n=>r.onDestroy(n.next.bind(n)));return n=>n.pipe((0,O.R)(t))}class Y extends Error{constructor(t,n){super(function j(r,t){return`NG0${Math.abs(r)}${t?": "+t:""}`}(t,n)),this.code=t}}var q=u(5719);function K(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Email is required "),e.qZA())}function z(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid email address "),e.qZA())}function ee(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Password is required "),e.qZA())}function re(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1,"No active account with given credentials was found."),e.qZA())}let te=(()=>{class r{constructor(n,o,i,l,a){this.auth=n,this.destroyRef=o,this.router=i,this.changeDetector=l,this.fb=a,this.isLoading=!1,this.isDisabled=!1,this.loginForm=this.fb.group({email:["",[s.kI.required,s.kI.email]],password:["",s.kI.required]})}onSubmit(){this.loginForm.invalid||(this.isLoading=!0,this.auth.login(this.loginForm.getRawValue()).pipe((0,A.K)(()=>(this.isLoading=!1,this.loginForm.setErrors({formError:!0}),this.changeDetector.markForCheck(),T.E)),w(this.destroyRef)).subscribe(()=>{this.isLoading=!1,this.router.navigate(["/anime"])}))}}return r.\u0275fac=function(n){return new(n||r)(e.Y36(q.e),e.Y36(e.ktI),e.Y36(C.F0),e.Y36(e.sBO),e.Y36(s.qu))},r.\u0275cmp=e.Xpm({type:r,selectors:[["camp-log-in"]],decls:18,vars:7,consts:[[1,"wrapper"],[1,"heading"],[1,"log-in-form",3,"formGroup","ngSubmit"],["matInput","","type","email","formControlName","email","placeholder","user@gmail.com"],[4,"ngIf"],["matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","","color","accent",1,"log-in-button",3,"disabled"]],template:function(n,o){if(1&n&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"Welcome back, friend"),e.qZA(),e.TgZ(3,"form",2),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(4,"mat-form-field")(5,"mat-label"),e._uU(6,"Email"),e.qZA(),e._UZ(7,"input",3),e.YNc(8,K,2,0,"mat-error",4),e.YNc(9,z,2,0,"mat-error",4),e.qZA(),e.TgZ(10,"mat-form-field")(11,"mat-label"),e._uU(12,"Password"),e.qZA(),e._UZ(13,"input",5),e.YNc(14,ee,2,0,"mat-error",4),e.qZA(),e.YNc(15,re,2,0,"mat-error",4),e.TgZ(16,"button",6),e._uU(17),e.qZA()()()),2&n){let i,l,a;e.xp6(3),e.Q6J("formGroup",o.loginForm),e.xp6(5),e.Q6J("ngIf",null==(i=o.loginForm.get("email"))?null:i.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==(l=o.loginForm.get("email"))?null:l.hasError("email")),e.xp6(5),e.Q6J("ngIf",null==(a=o.loginForm.get("password"))?null:a.invalid),e.xp6(1),e.Q6J("ngIf",o.loginForm.hasError("formError")),e.xp6(1),e.Q6J("disabled",o.isLoading),e.xp6(1),e.hij(" ",o.isLoading?"Logging in...":"Log in"," ")}},dependencies:[h.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,v.Nt,c.KE,c.hX,c.TO,y.lW],styles:[".wrapper[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:30px 0}.heading[_ngcontent-%COMP%]{padding:30px 0}.log-in-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.log-in-button[_ngcontent-%COMP%]{display:block;margin:20px auto 0}.log-in-button[_ngcontent-%COMP%]:disabled{background-color:var(--accent-color-dimmed);color:#fff}"],changeDetection:0}),r})();function ne(r,t){return n=>{const o=n.get(r),i=n.get(t);return null!==o&&null!==i&&o.value!==i.value?n.get(t)?.setErrors({matchError:!0}):n.get(t)?.setErrors(null),null}}var oe=u(9989);function ie(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Required field "),e.qZA())}function se(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Required field "),e.qZA())}function ae(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Required field "),e.qZA())}function le(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Please enter a valid email address "),e.qZA())}function ue(r,t){if(1&r&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&r){const n=e.oxw();e.xp6(1),e.Oqu(n.validationErrors.email)}}function de(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Required field "),e.qZA())}function ce(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Password must be at least 8 characters long "),e.qZA())}function me(r,t){if(1&r&&(e.TgZ(0,"mat-error"),e._uU(1),e.qZA()),2&r){const n=e.oxw();e.xp6(1),e.Oqu(n.validationErrors.password)}}function pe(r,t){1&r&&(e.TgZ(0,"mat-error"),e._uU(1," Passwords don't match "),e.qZA())}const ge=[{path:"",redirectTo:"log-in",pathMatch:"full"},{path:"log-in",component:te},{path:"sign-up",component:(()=>{class r{constructor(n,o,i,l,a){this.auth=n,this.destroyRef=o,this.router=i,this.changeDetector=l,this.fb=a,this.validationErrors={email:"",password:""},this.isLoading=!1,this.signUpForm=this.fb.group({firstName:["",s.kI.required],lastName:["",s.kI.required],email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required,s.kI.minLength(8)]],confirmedPassword:["",s.kI.required]},{validators:ne("password","confirmedPassword")})}onSubmit(){if(this.signUpForm.markAllAsTouched(),this.signUpForm.invalid)return;this.isLoading=!0;const n={avatar:null,...this.signUpForm.getRawValue()};this.auth.register(n).pipe((0,A.K)(o=>(o instanceof oe.p&&(this.changeDetector.markForCheck(),this.isLoading=!1,this.validationErrors.email="",this.validationErrors.password="",o.errors.forEach(i=>{"email"===i.attr&&(this.validationErrors.email+=i.detail,this.signUpForm.get("email")?.setErrors({emailError:!0})),"password"===i.attr&&(this.validationErrors.password+=i.detail,this.signUpForm.get("password")?.setErrors({passwordError:!0}))})),T.E)),w(this.destroyRef)).subscribe(()=>{this.isLoading=!1,this.router.navigate(["/anime"])})}}return r.\u0275fac=function(n){return new(n||r)(e.Y36(q.e),e.Y36(e.ktI),e.Y36(C.F0),e.Y36(e.sBO),e.Y36(s.qu))},r.\u0275cmp=e.Xpm({type:r,selectors:[["camp-sign-up"]],decls:35,vars:12,consts:[[1,"wrapper"],[1,"heading"],[1,"sign-up-form",3,"formGroup","ngSubmit"],["matInput","","type","text","formControlName","firstName"],[4,"ngIf"],["matInput","","type","text","formControlName","lastName"],["matInput","","type","email","formControlName","email","placeholder","user@gmail.com"],["matInput","","type","password","formControlName","password"],["matInput","","type","password","formControlName","confirmedPassword"],["type","submit","mat-raised-button","","color","accent",1,"sign-up-button",3,"disabled"]],template:function(n,o){if(1&n&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"Create your account"),e.qZA(),e.TgZ(3,"form",2),e.NdJ("ngSubmit",function(){return o.onSubmit()}),e.TgZ(4,"mat-form-field")(5,"mat-label"),e._uU(6,"First name"),e.qZA(),e._UZ(7,"input",3),e.YNc(8,ie,2,0,"mat-error",4),e.qZA(),e.TgZ(9,"mat-form-field")(10,"mat-label"),e._uU(11,"Last name"),e.qZA(),e._UZ(12,"input",5),e.YNc(13,se,2,0,"mat-error",4),e.qZA(),e.TgZ(14,"mat-form-field")(15,"mat-label"),e._uU(16,"Email"),e.qZA(),e._UZ(17,"input",6),e.YNc(18,ae,2,0,"mat-error",4),e.YNc(19,le,2,0,"mat-error",4),e.YNc(20,ue,2,1,"mat-error",4),e.qZA(),e.TgZ(21,"mat-form-field")(22,"mat-label"),e._uU(23,"Password"),e.qZA(),e._UZ(24,"input",7),e.YNc(25,de,2,0,"mat-error",4),e.YNc(26,ce,2,0,"mat-error",4),e.YNc(27,me,2,1,"mat-error",4),e.qZA(),e.TgZ(28,"mat-form-field")(29,"mat-label"),e._uU(30,"Confirm password"),e.qZA(),e._UZ(31,"input",8),e.YNc(32,pe,2,0,"mat-error",4),e.qZA(),e.TgZ(33,"button",9),e._uU(34),e.qZA()()()),2&n){let i,l,a,F,x,P,k,V,D;e.xp6(3),e.Q6J("formGroup",o.signUpForm),e.xp6(5),e.Q6J("ngIf",null==(i=o.signUpForm.get("firstName"))?null:i.hasError("required")),e.xp6(5),e.Q6J("ngIf",null==(l=o.signUpForm.get("firstName"))?null:l.hasError("required")),e.xp6(5),e.Q6J("ngIf",null==(a=o.signUpForm.get("email"))?null:a.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==(F=o.signUpForm.get("email"))?null:F.hasError("email")),e.xp6(1),e.Q6J("ngIf",null==(x=o.signUpForm.get("email"))?null:x.hasError("emailError")),e.xp6(5),e.Q6J("ngIf",null==(P=o.signUpForm.get("password"))?null:P.hasError("required")),e.xp6(1),e.Q6J("ngIf",null==(k=o.signUpForm.get("password"))?null:k.hasError("minlength")),e.xp6(1),e.Q6J("ngIf",null==(V=o.signUpForm.get("password"))?null:V.hasError("passwordError")),e.xp6(5),e.Q6J("ngIf",null==(D=o.signUpForm.get("confirmedPassword"))?null:D.hasError("matchError")),e.xp6(1),e.Q6J("disabled",o.isLoading),e.xp6(1),e.hij(" ",o.isLoading?"Signing up...":" Sing up"," ")}},dependencies:[h.O5,s._Y,s.Fj,s.JJ,s.JL,s.sg,s.u,v.Nt,c.KE,c.hX,c.TO,y.lW],styles:[".wrapper[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:40px 0}.heading[_ngcontent-%COMP%]{padding:30px 0}.sign-up-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:18px}.sign-up-button[_ngcontent-%COMP%]{display:block;margin:20px auto 0}.sign-up-button[_ngcontent-%COMP%]:disabled{background-color:var(--accent-color-dimmed);color:#fff}"],changeDetection:0}),r})()},{path:"**",redirectTo:"log-in",pathMatch:"full"}];let fe=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[C.Bz.forChild(ge)]}),r})(),he=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[h.ez,s.UX,s.u5,v.c,c.lN,y.ot,fe]}),r})()}}]);