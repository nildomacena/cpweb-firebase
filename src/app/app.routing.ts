import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessoDetailComponent } from './processos/processo-detail';
import { NotaFiscalComponent } from './nota-fiscal';
import { EmpenhoComponent } from './empenho';
import { UserComponent, PasswordComponent}        from './user';
import { LoginComponent} from './login';
import { ProcessoMasterComponent } from './processos/processo-master';
import { ProcessoCadastroComponent } from './processos/processo-cadastro';
const appRoutes: Routes = [ 
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'processo/:id', component: ProcessoDetailComponent},
    {path: 'empenho', component: EmpenhoComponent},
    {path: 'notafiscal', component: NotaFiscalComponent},
    {path: 'user', component: UserComponent},
    {path: 'password', component: PasswordComponent},
    {path: 'processos', component: ProcessoMasterComponent},
    {path: 'cadastrar_processo', component: ProcessoCadastroComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);