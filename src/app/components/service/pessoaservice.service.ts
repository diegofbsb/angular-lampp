import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pessoa} from "../model/Pessoa";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PessoaserviceService {
  API = 'http://127.0.0.1:8090/project';

  pessoaList: Pessoa[] =[];

  constructor(private httpClient: HttpClient) {
  }

  getAllPessoa(): void {
    this.httpClient.get<Pessoa[]>(this.API + '/pessoa').subscribe((res) => (this.pessoaList = res));
    console.log(this.pessoaList)
  }

  savePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.API + '/pessoa', pessoa);
  }
}
