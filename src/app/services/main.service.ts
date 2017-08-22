import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    private url_api: string = '/api/';
    private companies: string = 'companies';
    private individuals: string = 'individuals';
    private types_charges: string = 'types-charges';

    constructor(private http: Http) { }

    //company
    getCompanies(): Observable<any> {
        return this.http.get(`${this.url_api}${this.companies}`).map(res => res.json());
    }

    countCompanies(): Observable<any> {
        return this.http.get(`${this.url_api}${this.companies}/count`).map(res => res.json());
    }

    addCompany(company): Observable<any> {
        return this.http.post(`${this.url_api}${this.companies}`, JSON.stringify(company), this.options);
    }

    getCompany(company): Observable<any> {
        return this.http.get(`${this.url_api}${this.companies}/${company._id}`, this.options);
    }

    editCompany(company): Observable<any> {
        return this.http.put(`${this.url_api}${this.companies}/${company._id}`, JSON.stringify(company), this.options);
    }

    deleteCompany(company): Observable<any> {
        return this.http.delete(`${this.url_api}${this.companies}/${company._id}`, this.options);
    }

    //individuals
    getIndividuals(): Observable<any> {
        return this.http.get(`${this.url_api}${this.individuals}`).map(res => res.json());
    }

    countIndividuals(): Observable<any> {
        return this.http.get(`${this.url_api}${this.individuals}/count`).map(res => res.json());
    }

    addIndividual(individual): Observable<any> {
        return this.http.post(`${this.url_api}${this.individuals}`, JSON.stringify(individual), this.options);
    }

    getIndividual(individual): Observable<any> {
        return this.http.get(`${this.url_api}${this.individuals}/${individual._id}`, this.options);
    }

    editIndividual(individual): Observable<any> {
        return this.http.put(`${this.url_api}${this.individuals}/${individual._id}`, JSON.stringify(individual), this.options);
    }

    deleteIndividual(individual): Observable<any> {
        return this.http.delete(`${this.url_api}${this.individuals}/${individual._id}`, this.options);
    }

    //type-charge
    getTypesCharges(): Observable<any> {
        return this.http.get(`${this.url_api}${this.types_charges}`).map(res => res.json());
    }

    countTypesCharges(): Observable<any> {
        return this.http.get(`${this.url_api}${this.types_charges}/count`).map(res => res.json());
    }

    addTypeCharge(individual): Observable<any> {
        return this.http.post(`${this.url_api}${this.types_charges}`, JSON.stringify(individual), this.options);
    }

    getTypeCharge(individual): Observable<any> {
        return this.http.get(`${this.url_api}${this.types_charges}/${individual._id}`, this.options);
    }

    editTypeCharge(individual): Observable<any> {
        return this.http.put(`${this.url_api}${this.types_charges}/${individual._id}`, JSON.stringify(individual), this.options);
    }

    deleteTypeCharge(individual): Observable<any> {
        return this.http.delete(`${this.url_api}${this.types_charges}/${individual._id}`, this.options);
    }    

}