import { Injectable } from '@angular/core';
import { HttpHandler } from '@angular/common/http';
import { HttpService } from './index'
import { AppConfig } from '@app/app.config';

@Injectable()
export class CompaniesService extends HttpService {

    constructor(protected http: HttpHandler) {
        super(http);
        this.url = AppConfig.apiUrl + 'companies';
    }
}