import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pessoa} from "../model/Pessoa";
import {PessoaserviceService} from "../service/pessoaservice.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-pessoa',
  templateUrl: './form-pessoa.component.html',
  styleUrls: ['./form-pessoa.component.css']
})
export class FormPessoaComponent implements OnInit {

  formGroupPessoa: FormGroup;

  pessoaList: Pessoa[] = [];

  pessoaModel: any;

  pessoa: Pessoa;

  constructor(private formBuilder: FormBuilder,
              private pessoaserviceService: PessoaserviceService) {
    this.formGroupPessoa = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.maxLength(250),
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/)]],
      ddd: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
    });
  }

  validaForm(): void {
    this.formGroupPessoa = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ddd: ['', [Validators.length == 2]],
      telefone: ['', [Validators.length == 9]],
      cpf: ['', [Validators.length == 11]],
      dataNascimento: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
    });
  }

  salvarPessoa() {
      this.pessoa = this.formGroupPessoa.value;
      this.pessoa.dataNascimento = this.transform(this.pessoa.dataNascimento)
      this.pessoaserviceService.savePessoa(this.pessoa).subscribe((resp) => {
        this.pessoaserviceService.getAllPessoa().subscribe((data: Pessoa[]) => {
          this.pessoaList = data
          this.formGroupPessoa.reset();
        }, error => {
          console.log(error);
        });
      });
  }

  excluirPessoa(pessoa: Pessoa) {
    console.log(pessoa);
    this.pessoaserviceService.deletePessoa(pessoa).subscribe(data => {
    }, error => {
      console.log(error);
    });
    this.pessoaList.splice(this.pessoaList.indexOf(pessoa), 1);
  }

  updatePessoa(pessoa: Pessoa) {
    this.createForm(pessoa)
  }

  transform(value: string) {
    var datePipe = new DatePipe("en-US");
    return datePipe.transform(value, 'dd-MM-yyyy');
  }

  transform2(value: string) {
    var datePipe = new DatePipe("en-US");
    return datePipe.transform(value, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.pessoaserviceService.getAllPessoa().subscribe((data: Pessoa[]) => {
      this.pessoaList = data;
    }, error => {
      console.log(error);
    });
  }

  createForm(pessoa: Pessoa) {
    this.formGroupPessoa = new FormGroup({
      id: new FormControl(pessoa.id),
      name: new FormControl(pessoa.name),
      email: new FormControl(pessoa.email),
      ddd: new FormControl(pessoa.ddd),
      telefone: new FormControl(pessoa.telefone),
      cpf: new FormControl(pessoa.cpf),
      dataNascimento: new FormControl(this.transform2(pessoa.dataNascimento)),
      observacoes: new FormControl(pessoa.observacoes)
    })
  }

  reset(){
    this.formGroupPessoa.reset();
  }

  onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
}
