import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header';
import { ProcessoDetailComponent} from './processos/processo-detail';
import { NotaFiscalComponent} from './nota-fiscal';
import { EmpenhoComponent} from './empenho';
import { ProcessoService} from './services/processo.service';
import { UserComponent, PasswordComponent} from './user';
import { LoginComponent } from './login/login.component';
import { AuthService, AuthGuard} from './services';
import { ProcessoMasterComponent } from './processos/processo-master';
import { appRoutingProviders, routing } from './app.routing';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { ProcessoCadastroComponent } from './processos/processo-cadastro';

export const firebaseConfig = {
  apiKey: "AIzaSyCgIyt1k90LdrVilfdsk_nx6rpE7_aQGRo",
  authDomain: "cpweb-dc825.firebaseapp.com",
  databaseURL: "https://cpweb-dc825.firebaseio.com",
  storageBucket: "cpweb-dc825.appspot.com",
  messagingSenderId: "651869103107"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        ProcessoDetailComponent,
        NotaFiscalComponent,
        EmpenhoComponent,
        UserComponent,
        LoginComponent,
        PasswordComponent,
        ProcessoMasterComponent,
        ProcessoCadastroComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    ProcessoService,
    AuthService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
