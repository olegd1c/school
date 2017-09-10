import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from './../toast/toast.component';
import { Menu } from '@app/models/menu.ts';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    menu: Menu[] = [
        {
            name: 'Довідники',
            children: [
                {
                    name: 'Організації',
                    permission: ['admin'],
                    routerLink: 'main/companies'
                },
                {
                    name: 'Физ.Особи',
                    permission: ['admin'],
                    routerLink: 'main/individuals'
                },
                {
                    name: 'Види нарахувань',
                    permission: ['admin'],
                    routerLink: 'main/types-charges'
                },
                {
                    name: 'Посади',
                    permission: ['admin'],
                    routerLink: 'main/positions'
                },
                {
                    name: 'Види бюджету',
                    permission: ['admin'],
                    routerLink: 'main/type-budgets'
                },
                {
                    name: 'Види зайнятості',
                    permission: ['admin'],
                    routerLink: 'main/type-works'
                }, {
                    name: 'Одиниці виміру',
                    permission: ['admin'],
                    routerLink: 'main/units'
                },
            ]
        },
        {
            name: 'Документи',
            children: [
                {
                    name: 'Прийом на роботу',
                    permission: ['admin'],
                    routerLink: 'main/recruitments'
                },
                {
                    name: 'Табель',
                    permission: ['admin'],
                    routerLink: 'main/time-sheets'
                },
            ]
        }
    ];

    constructor(private http: Http,
        public toast: ToastComponent,
        public formBuilder: FormBuilder
    ) { }

    ngOnInit() {

    }

}
