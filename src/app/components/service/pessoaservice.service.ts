import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pessoa} from "../model/Pessoa";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PessoaserviceService {
  API = 'http://localhost:8090/project';

  pessoaList: Pessoa[] = [];

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json ; text/plain",
      "Content-type": "application/json; charset=utf-8"
    })
  }

  getAllPessoa(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(this.API + '/pessoa');
  }

  savePessoa(pessoa: Pessoa): Observable<Pessoa> {
    console.log(pessoa)
    return this.httpClient.post<Pessoa>(this.API + '/pessoa', pessoa);
  }

  deletePessoa(pessoa: Pessoa): Observable<Pessoa> {
    console.log(`${this.API}/pessoa/delete/${pessoa.id}`)
    return this.httpClient.delete<Pessoa>(`${this.API}/pessoa/delete/${pessoa.id}`)
  }

  updatePessoa(pessoa: Pessoa) {
    console.log(`${this.API}/update/${pessoa}`)
    this.httpClient.put(`${this.API}/pessoa/update`, pessoa);
  }

}
