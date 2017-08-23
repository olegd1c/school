import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface ILanguage{
  lang:string;
  value:string
}

const LANGS: ILanguage[] = 
      [{lang:'uk',value:'Українська'},
        {lang:'ru',value:'Русский'},
        {lang:'en',value:'English'}];

const LANGS_LIST: string[] = ['uk', 'ru', 'en'];

export interface IAppConfig {
  langs: ILanguage[];
  defLang: ILanguage;
  lngList: string[];
  apiUrl: string;
}

const API_URL: string = '/api/';

export const AppConfig: IAppConfig = {
  langs: LANGS,
  defLang: LANGS[1],
  lngList: LANGS_LIST,
  apiUrl: API_URL
};