import { HttpClient, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from '@app/app.config';

@Injectable()
export class HttpService extends HttpClient {

    protected url: string;
    private entity: any;
    /*
    protected options = {
      params: new HttpParams().set('id', '56784'),
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })
    }
    */
    protected httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) };

    constructor(http: HttpHandler) {
        super(http);
    }

    setUrl(url: string) {
        this.url = AppConfig.apiUrl + url;
    }

    _get(): Observable<any> {
        return this.get(`${this.url}`);
    }

    _count(): Observable<any> {
        return this.get(`${this.url}/count`);
    }

    _add(entity: any): Observable<any> {
        return this.post(`${this.url}`, JSON.stringify(entity), this.httpOptions);
    }

    _getOne(entity: any): Observable<any> {
        return this.get(`${this.url}/${entity._id}`, this.httpOptions);
    }

    _edit(entity: any): Observable<any> {
        return this.put(`${this.url}/${entity._id}`, JSON.stringify(entity), this.httpOptions);
    }

    _delete(entity: any): Observable<any> {
        return this.delete(`${this.url}/${entity._id}`, this.httpOptions);
    }
}
