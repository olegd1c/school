import { HttpClient, HttpRequest , HttpHandler, HttpXhrBackend } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class HttpService extends HttpClient {

    public url:string;
    private entity:any;
    public headers: Headers;
    public fields:Array<string> = [];

    constructor(backend: HttpHandler) {
        super(backend);
    }
}
