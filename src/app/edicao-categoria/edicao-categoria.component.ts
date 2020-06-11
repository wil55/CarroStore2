import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../models/categoria.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-categoria',
  templateUrl: './edicao-categoria.component.html',
  styleUrls: ['./edicao-categoria.component.scss']
})
export class EdicaoCategoriaComponent implements OnInit {

  idCategoria: string;
  categoria: Categoria;

  formulario = this.formBuilder.group({
    nome: ['', Validators.required]
  });


  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activedRoute: ActivatedRoute
    ) {

   }
  

  async ngOnInit(){

    this.formulario.disable();
    
    this.idCategoria = this.activedRoute.snapshot.paramMap.get('id');
    this.categoria = await this.categoriaService.get(this.idCategoria);

    this.formulario.enable();

  }

  async submit() {

    if(!this.formulario.valid){
      return;
    }

    this.formulario.disable();

    const categoriaEditado = this.formulario.value as Categoria;
    categoriaEditado.dataEdicao = new Date();

    const categoria = await this.categoriaService.update(this.idCategoria, categoriaEditado);

    Object.assign(this.categoria, categoriaEditado);

    this.formulario.enable();

    this.snackBar.open('Categoria atualizado com sucesso!');

  }

  voltar(){
    this.location.back();
  }

}
