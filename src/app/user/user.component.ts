import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService} from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    });
  }

  onSubmit(){
    let retorno = this.authService.signup(this.myForm.value);
    retorno
      .then(data =>{
        alert("Cadastro efetuado com sucesso");  
        this.router.navigate(['processo']);
      })
      .catch(error =>{
        alert("Ocorreu um erro durante o seu cadastro. Tente novamente mais tarde, caso o erro persista, contate o adminsitrador do sistema");
        console.log(error);
      });

  }

}
