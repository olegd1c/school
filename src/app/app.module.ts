import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ToastComponent } from './components/toast/toast.component';
import { CompaniesService, IndividualsService, HttpService, TypesChargesService, PositionsService,
    TypeBudgetsService, RecruitmentsService
} from './services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
// Angular Material
//import { MaterialModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SelectModule} from 'ng-select';

import { CompaniesComponent } from '@app/components/companies/companies.component';
import { IndividualsComponent } from '@app/components/individuals/individuals.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { BootstrapGridModule } from 'ng2-bootstrap-grid';
import { TypesChargesComponent } from '@app/components/types-charges/types-charges.component';
import { PositionsComponent } from '@app/components/positions/positions.component';
import { PositionItemComponent } from '@app/components/positions/components/position-item/position-item.component';
import { HeaderComponent } from '@app/components/header/header.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { TimeSheetComponent } from '@app/components/time-sheet/time-sheet.component';
import { RecruitmentComponent } from '@app/components/recruitment/recruitment.component';
import { RecruitmentItemComponent } from '@app/components/recruitment/components/recruitment-item/recruitment-item.component';
import { RecruitmentEditComponent } from '@app/components/recruitment/components/recruitment-edit/recruitment-edit.component';
import { TypeBudgetsComponent } from '@app/components/type-budgets/type-budgets.component';


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
                    {path: 'positions', component: PositionsComponent,
                        data: {permissions: ['admin'], title: 'positions'}, },
                    {path: 'position-item', component: PositionItemComponent,
                        data: {permissions: ['admin'], title: 'positions'}, },
                    {path: 'position-item/:id', component: PositionItemComponent,
                        data: {permissions: ['admin'], title: 'positions'}, },
                    {path: 'time-sheets', component: TimeSheetComponent,
                        data: {permissions: ['admin'], title: 'time-sheet'}, },
                    {path: 'recruitments', component: RecruitmentComponent,
                        data: {permissions: ['admin'], title: 'recruitments'}, },
                    {path: 'recruitment-item/:id', component: RecruitmentItemComponent,
                        data: {permissions: ['admin'], title: 'positions'}, },
                    {path: 'recruitment-edit/:id', component: RecruitmentEditComponent,
                        data: {permissions: ['admin'], title: 'recruitment-edit'}, },
                    {path: 'recruitment-edit', component: RecruitmentEditComponent,
                        data: {permissions: ['admin'], title: 'recruitment-edit'}, },                          
                    {path: 'type-budgets', component: TypeBudgetsComponent,
                        data: {permissions: ['admin'], title: 'type-budgets'}, },
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
        TypesChargesComponent,
        PositionsComponent,
        PositionItemComponent,
        HeaderComponent,
        FooterComponent,
        TimeSheetComponent,
        RecruitmentComponent,
        RecruitmentItemComponent,
        TypeBudgetsComponent,
        RecruitmentEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        BootstrapGridModule,
        SelectModule
    ],
    providers: [
        FormBuilder,
        CompaniesService,
        IndividualsService,
        TypesChargesService,
        PositionsService,
        TypeBudgetsService,
        RecruitmentsService,
        ToastComponent
    ],
    bootstrap: [AppComponent],
    exports: [ RouterModule ]
})
export class AppModule { }
