import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
      this.buildForm();
  }

  buildForm(){
    this.myForm = this.formBuilder.group({
      'email': ['',Validators.required]
    });
  }
  onSubmit(){
      this.authService.resetPassword(this.myForm.value)
      .then(() => {
          alert("Um email com as instruções de atualização de senha foi enviado para você.<br>Atualize sua senha e refaça o login.");
          this.router.navigate(['login']);
      })
      .catch((error) => {
        if(error.code == 'auth/invalid-email')
            alert("O email digitado está incorreto");
        if(error.code == 'auth/user-not-found')
            alert("O email digitado não está cadastrado no CPWEB");
        this.buildForm();
        console.log(error);
      })
  }

}
