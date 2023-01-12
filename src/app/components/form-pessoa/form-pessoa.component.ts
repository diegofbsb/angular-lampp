import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Pessoa} from "../model/Pessoa";
import {PessoaserviceService} from "../service/pessoaservice.service";

@Component({
  selector: 'app-form-pessoa',
  templateUrl: './form-pessoa.component.html',
  styleUrls: ['./form-pessoa.component.css']
})
export class FormPessoaComponent implements OnInit {

  formPessoa: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder,
              private pessoaserviceService: PessoaserviceService) {
  }

  ngOnInit(): void {
    this.pessoaserviceService.getAllPessoa();
  }

  salvarPessoa(pessoa: FormGroup<any>) {
/*    this.pessoaserviceService.savePessoa(pessoa).subscribe((resp) => {
      this.pessoaserviceService.getAllPessoa();
    }, error => {
      console.log(error);
    });*/
  }

  createForm(pessoa: Pessoa) {
    this.formPessoa = this.formBuilder.group({
      id: [pessoa.id],
      name: [pessoa.name],
      cpf: [pessoa.cpf],
      ddd: [pessoa.ddd],
      telefone: [pessoa.telefone],
      dataNascimento: [pessoa.dataNascimento],
      observacoes: [pessoa.observacoes],
      email: [pessoa.email]
    })
  }
}
