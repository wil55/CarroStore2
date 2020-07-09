import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { CorService } from '../services/cor.service';
import { Cor } from '../models/cor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-cor',
  templateUrl: './cadastro-cor.component.html',
  styleUrls: ['./cadastro-cor.component.scss']
})
export class CadastroCorComponent implements OnInit {

  formulario = this.formBuilder.group({
    nome: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private corService: CorService, 
    private snackBar: MatSnackBar,
    private location: Location,
    ) {

   }
  

  ngOnInit(): void {
  }

  async submit() {

    if (!this.formulario.valid) {
      return;
    }

    this.formulario.disable();

    const novaCor = this.formulario.value as Cor;
    novaCor.dataCadastro = new Date();

    const cor = await this.corService.add(novaCor);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

    this.snackBar.open('Cadastro da Cor efetuado com sucesso!');

  }

  voltar(){
    this.location.back();
  }


}
