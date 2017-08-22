import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ToastComponent } from './components/toast/toast.component';
import { MainService } from './services/main.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
// Angular Material
//import { MaterialModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from "./services/http.service";
import { HttpClient } from '@angular/common/http';

import { CompaniesComponent } from '@app/components/companies/companies.component';
import { IndividualsComponent } from '@app/components/individuals/individuals.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { BootstrapGridModule } from 'ng2-bootstrap-grid';
import { TypesChargesComponent } from '@app/components/types-charges/types-charges.component';

const routes: Routes = [
    { path: '',  component: LoginComponent, data: { title: 'entracne'} },
    { path: 'main',  component: MainComponent, data: { title: 'main'},
                children: [
                    { path: '', redirectTo: 'companies', pathMatch: 'full',  },
                    {path: 'companies', component: CompaniesComponent,
                        data: {permissions: ['admin'], title: 'companies'}, },
                    {path: 'individuals', component: IndividualsComponent,
                        data: {permissions: ['admin'], title: 'individuals'}, },
                    {path: 'types-charges', component: TypesChargesComponent,
                        data: {permissions: ['admin'], title: 'individuals'}, },                        
                ]
},
    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        ToastComponent,
        LoginComponent,
        CompaniesComponent,
        IndividualsComponent,
        TypesChargesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        BootstrapGridModule
    ],
    providers: [
        FormBuilder,
        MainService,
        ToastComponent
    ],
    bootstrap: [AppComponent],
    exports: [ RouterModule ]
})
export class AppModule { }
