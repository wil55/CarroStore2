import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss']
})
export class CadastroCategoriaComponent implements OnInit {

  formulario = this.formBuilder.group({
    nome: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
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

    const novaCategoria = this.formulario.value as Categoria;
    novaCategoria.dataCadastro = new Date();

    const categoria = await this.categoriaService.add(novaCategoria);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

    this.snackBar.open('Cadastro da Categoria efetuado com sucesso!');

  }

  voltar(){
    this.location.back();
  }

}
