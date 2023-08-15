"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[776],{9845:(X,f,s)=>{s.r(f),s.d(f,{AuthModule:()=>B});var p=s(89),e=s(6652),g=s(2074),m=s(8640),d=s(1300),c=s(2621),h=s(3568),E=s(3787),_=s(7881),r=s(4355),U=s(9);function I(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Email is required "),r.qZA())}function N(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Please enter a valid email address "),r.qZA())}function q(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Password is required "),r.qZA())}function x(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1,"No active account with given credentials was found."),r.qZA())}let F=(()=>{class t{constructor(n,o,a,l){this.auth=n,this.destroyRef=o,this.router=a,this.changeDetector=l,this.isLoading=!1,this.isDisabled=!1,this.loginForm=new e.cw({email:new e.NI("",[e.kI.required,e.kI.email]),password:new e.NI("",e.kI.required)})}onSubmit(){this.loginForm.invalid||(this.isLoading=!0,this.auth.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).pipe((0,h.K)(()=>(this.isLoading=!1,this.loginForm.setErrors({formError:!0}),this.changeDetector.markForCheck(),(0,E._)(()=>new Error("No active account with given credentials was found.")))),(0,_.sL)(this.destroyRef)).subscribe(o=>{this.isLoading=!1,this.auth.setUser(o.access,o.refresh),this.router.navigate(["/anime"])}))}}return t.\u0275fac=function(n){return new(n||t)(r.Y36(U.e),r.Y36(r.ktI),r.Y36(c.F0),r.Y36(r.sBO))},t.\u0275cmp=r.Xpm({type:t,selectors:[["camp-log-in"]],decls:18,vars:7,consts:[[1,"wrapper"],[1,"heading"],[1,"log-in-form",3,"formGroup","ngSubmit"],["matInput","","type","email","formControlName","email","placeholder","user@gmail.com"],[4,"ngIf"],["matInput","","type","password","formControlName","password"],["type","submit","mat-raised-button","","color","accent",1,"log-in-button",3,"disabled"]],template:function(n,o){if(1&n&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Welcome back, friend"),r.qZA(),r.TgZ(3,"form",2),r.NdJ("ngSubmit",function(){return o.onSubmit()}),r.TgZ(4,"mat-form-field")(5,"mat-label"),r._uU(6,"Email"),r.qZA(),r._UZ(7,"input",3),r.YNc(8,I,2,0,"mat-error",4),r.YNc(9,N,2,0,"mat-error",4),r.qZA(),r.TgZ(10,"mat-form-field")(11,"mat-label"),r._uU(12,"Password"),r.qZA(),r._UZ(13,"input",5),r.YNc(14,q,2,0,"mat-error",4),r.qZA(),r.YNc(15,x,2,0,"mat-error",4),r.TgZ(16,"button",6),r._uU(17),r.qZA()()()),2&n){let a,l,u;r.xp6(3),r.Q6J("formGroup",o.loginForm),r.xp6(5),r.Q6J("ngIf",null==(a=o.loginForm.get("email"))?null:a.hasError("required")),r.xp6(1),r.Q6J("ngIf",null==(l=o.loginForm.get("email"))?null:l.hasError("email")),r.xp6(5),r.Q6J("ngIf",null==(u=o.loginForm.get("password"))?null:u.invalid),r.xp6(1),r.Q6J("ngIf",o.loginForm.hasError("formError")),r.xp6(1),r.Q6J("disabled",o.isLoading),r.xp6(1),r.hij(" ",o.isLoading?"Logging in...":"Log in"," ")}},dependencies:[p.O5,e._Y,e.Fj,e.JJ,e.JL,e.sg,e.u,g.Nt,m.KE,m.hX,m.TO,d.lW],styles:[".wrapper[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:30px 0}.heading[_ngcontent-%COMP%]{padding:30px 0}.log-in-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}.log-in-button[_ngcontent-%COMP%]{display:block;margin:20px auto 0}.log-in-button[_ngcontent-%COMP%]:disabled{background-color:var(--accent-color-dimmed);color:#fff}"],changeDetection:0}),t})();function b(t,i){return n=>{const o=n.get(t),a=n.get(i);return null!==o&&null!==a&&o.value!==a.value?n.get("confirmedPassword")?.setErrors({matchError:!0}):n.get("confirmedPassword")?.setErrors(null),null}}var y=s(9018),L=s(9989);function S(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Required field "),r.qZA())}function J(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Required field "),r.qZA())}function P(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Required field "),r.qZA())}function Y(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Please enter a valid email address "),r.qZA())}function M(t,i){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const n=r.oxw();r.xp6(1),r.Oqu(n.validationErrors.email)}}function O(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Required field "),r.qZA())}function Q(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Password must be at least 8 characters long "),r.qZA())}function k(t,i){if(1&t&&(r.TgZ(0,"mat-error"),r._uU(1),r.qZA()),2&t){const n=r.oxw();r.xp6(1),r.Oqu(n.validationErrors.password)}}function R(t,i){1&t&&(r.TgZ(0,"mat-error"),r._uU(1," Passwords don't match "),r.qZA())}const j=[{path:"",redirectTo:"log-in",pathMatch:"full"},{path:"log-in",component:F},{path:"sign-up",component:(()=>{class t{constructor(n,o,a,l){this.auth=n,this.router=o,this.destroyRef=a,this.changeDetector=l,this.validationErrors={email:"",password:""},this.isLoading=!1,this.signUpForm=new e.cw({firstName:new e.NI("",e.kI.required),lastName:new e.NI("",e.kI.required),email:new e.NI("",[e.kI.required,e.kI.email]),password:new e.NI("",[e.kI.required,e.kI.minLength(8)]),confirmedPassword:new e.NI("",e.kI.required)},{validators:b("password","confirmedPassword")})}onSubmit(){if(this.signUpForm.markAllAsTouched(),this.signUpForm.invalid)return;this.isLoading=!0;const n={avatar:null,...this.signUpForm.getRawValue()};this.auth.register(n).pipe((0,h.K)(o=>(o instanceof L.p&&(this.changeDetector.markForCheck(),this.isLoading=!1,this.validationErrors.email="",this.validationErrors.password="",o.errors.forEach(a=>{"email"===a.attr&&(this.validationErrors.email+=a.detail,this.signUpForm.get("email")?.setErrors({emailError:!0})),"password"===a.attr&&(this.validationErrors.password+=a.detail,this.signUpForm.get("password")?.setErrors({passwordError:!0}))})),y.E)),(0,_.sL)(this.destroyRef)).subscribe(o=>{this.isLoading=!1,this.auth.setUser(o.access,o.refresh),this.router.navigate(["/anime"])})}}return t.\u0275fac=function(n){return new(n||t)(r.Y36(U.e),r.Y36(c.F0),r.Y36(r.ktI),r.Y36(r.sBO))},t.\u0275cmp=r.Xpm({type:t,selectors:[["camp-sign-up"]],decls:35,vars:12,consts:[[1,"wrapper"],[1,"heading"],[1,"sign-up-form",3,"formGroup","ngSubmit"],["matInput","","type","text","formControlName","firstName"],[4,"ngIf"],["matInput","","type","text","formControlName","lastName"],["matInput","","type","email","formControlName","email","placeholder","user@gmail.com"],["matInput","","type","password","formControlName","password"],["matInput","","type","password","formControlName","confirmedPassword"],["type","submit","mat-raised-button","","color","accent",1,"sign-up-button",3,"disabled"]],template:function(n,o){if(1&n&&(r.TgZ(0,"div",0)(1,"h1",1),r._uU(2,"Create your account"),r.qZA(),r.TgZ(3,"form",2),r.NdJ("ngSubmit",function(){return o.onSubmit()}),r.TgZ(4,"mat-form-field")(5,"mat-label"),r._uU(6,"First name"),r.qZA(),r._UZ(7,"input",3),r.YNc(8,S,2,0,"mat-error",4),r.qZA(),r.TgZ(9,"mat-form-field")(10,"mat-label"),r._uU(11,"Last name"),r.qZA(),r._UZ(12,"input",5),r.YNc(13,J,2,0,"mat-error",4),r.qZA(),r.TgZ(14,"mat-form-field")(15,"mat-label"),r._uU(16,"Email"),r.qZA(),r._UZ(17,"input",6),r.YNc(18,P,2,0,"mat-error",4),r.YNc(19,Y,2,0,"mat-error",4),r.YNc(20,M,2,1,"mat-error",4),r.qZA(),r.TgZ(21,"mat-form-field")(22,"mat-label"),r._uU(23,"Password"),r.qZA(),r._UZ(24,"input",7),r.YNc(25,O,2,0,"mat-error",4),r.YNc(26,Q,2,0,"mat-error",4),r.YNc(27,k,2,1,"mat-error",4),r.qZA(),r.TgZ(28,"mat-form-field")(29,"mat-label"),r._uU(30,"Confirm password"),r.qZA(),r._UZ(31,"input",8),r.YNc(32,R,2,0,"mat-error",4),r.qZA(),r.TgZ(33,"button",9),r._uU(34),r.qZA()()()),2&n){let a,l,u,Z,w,T,C,v,A;r.xp6(3),r.Q6J("formGroup",o.signUpForm),r.xp6(5),r.Q6J("ngIf",null==(a=o.signUpForm.get("firstName"))?null:a.hasError("required")),r.xp6(5),r.Q6J("ngIf",null==(l=o.signUpForm.get("firstName"))?null:l.hasError("required")),r.xp6(5),r.Q6J("ngIf",null==(u=o.signUpForm.get("email"))?null:u.hasError("required")),r.xp6(1),r.Q6J("ngIf",null==(Z=o.signUpForm.get("email"))?null:Z.hasError("email")),r.xp6(1),r.Q6J("ngIf",null==(w=o.signUpForm.get("email"))?null:w.hasError("emailError")),r.xp6(5),r.Q6J("ngIf",null==(T=o.signUpForm.get("password"))?null:T.hasError("required")),r.xp6(1),r.Q6J("ngIf",null==(C=o.signUpForm.get("password"))?null:C.hasError("minlength")),r.xp6(1),r.Q6J("ngIf",null==(v=o.signUpForm.get("password"))?null:v.hasError("passwordError")),r.xp6(5),r.Q6J("ngIf",null==(A=o.signUpForm.get("confirmedPassword"))?null:A.hasError("matchError")),r.xp6(1),r.Q6J("disabled",o.isLoading),r.xp6(1),r.hij(" ",o.isLoading?"Signing up...":" Sing up"," ")}},dependencies:[p.O5,e._Y,e.Fj,e.JJ,e.JL,e.sg,e.u,g.Nt,m.KE,m.hX,m.TO,d.lW],styles:[".wrapper[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding:40px 0}.heading[_ngcontent-%COMP%]{padding:30px 0}.sign-up-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:18px}.sign-up-button[_ngcontent-%COMP%]{display:block;margin:20px auto 0}.sign-up-button[_ngcontent-%COMP%]:disabled{background-color:var(--accent-color-dimmed);color:#fff}"],changeDetection:0}),t})()},{path:"**",redirectTo:"log-in",pathMatch:"full"}];let D=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[c.Bz.forChild(j)]}),t})(),B=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[p.ez,e.UX,e.u5,g.c,m.lN,d.ot,D]}),t})()}}]);