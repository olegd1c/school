import { Injectable } from '@angular/core';
import { HttpHandler } from '@angular/common/http';
import { HttpService } from './index';
import { AppConfig } from '@app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TimeSheetsService extends HttpService {

    constructor(protected http: HttpHandler) {
        super(http);
        this.url = AppConfig.apiUrl + 'time-sheets';
    }

    getEmployees(entity: any): Observable<any> {
        let options = Object.assign({headers:this.httpOptions.headers},{params:entity});
        return this.post(`${this.url}/employees`, options);
    }    
}