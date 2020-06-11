import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/marca.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.scss']
})
export class CadastroMarcaComponent implements OnInit {

  formulario = this.formBuilder.group({
    nome  : ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private snackBar: MatSnackBar,
    private location: Location
    ) {

   }
  

  ngOnInit(): void {
  }

  async submit() {

    if (!this.formulario.valid) {
      return;
    }

    this.formulario.disable();

    const novaMarca = this.formulario.value as Marca;
    novaMarca.dataCadastro = new Date();

    const marca = await this.marcaService.add(novaMarca);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

    this.snackBar.open('Cadastro da Marca efetuado com sucesso!');

  }

  voltar(){
    this.location.back();
  }

}
