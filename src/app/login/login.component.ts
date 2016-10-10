import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../services';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(value => {
        console.log(value);
        if(value){
          this.router.navigate(['/processos']);
        }
        else
          this.buildForm();   
      });
    
  }

  buildForm(){
    this.myForm = this.formBuilder.group({
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    });
  }

  buildFormIncorrectPassword(email){
   this.myForm = this.formBuilder.group({
      'email': [email,Validators.required],
      'password': ['',Validators.required]
    }); 
  }

  onSubmit(){
    this.authService.signin(this.myForm.value)
      .then(data =>{
        this.router.navigate(['processos']);
      })
      .catch(error =>{
        console.log(error)
          alert("Ocorreu algum erro, tente novamente mais tarde. Caso o erro persista entre em contato com o administrador");
        });
  }

  onForgotPassword(){
    this.router.navigate(['password'])
  }

}
