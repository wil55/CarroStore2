import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { ProdutoService } from '../services/produto.service';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';
import { CustomValidators } from '../validators/custom-validators';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';
import { CorService } from '../services/cor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cor } from '../models/cor';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-edicao-produto',
  templateUrl: './edicao-produto.component.html',
  styleUrls: ['./edicao-produto.component.scss']
})
export class EdicaoProdutoComponent implements OnInit {

  idProduto: string;
  produto: Produto;

  marcas: Observable<Marca[]>;
  categorias: Observable<Categoria[]>;
  cores: Observable<Cor[]>;

  formulario = this.formBuilder.group({
    nome: ['', Validators.required],
    valor: ['', [Validators.required, CustomValidators.number]],
    potencia: ['', [Validators.required, CustomValidators.number]],
    idMarca: ['', Validators.required],
    idCategoria: ['', Validators.required],
    idCor: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private corService: CorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activedRoute: ActivatedRoute
  ) { }
    
  async ngOnInit(){

    this.formulario.disable();
    
    this.marcas = this.marcaService.getObservable();
    this.categorias = this.categoriaService.getObservable();
    this.cores = this.corService.getObservable();

    this.idProduto = this.activedRoute.snapshot.paramMap.get('id');
    this.produto = await this.produtoService.get(this.idProduto);

    this.formulario.enable();

  }

  async submit() {

    if (!this.formulario.valid) {
      return;
    }

    this.formulario.disable();

    const produtoEditado = this.formulario.value as Produto;
    produtoEditado.dataEdicao = new Date();

    const produto = await this.produtoService.update(this.idProduto, produtoEditado);

        console.log('Um produto foi editado -------------------------');
        console.log('produto:');
        console.log(this.produto);
        console.log('Campos atualizados:');
        console.log(produtoEditado);

    Object.assign(this.produto, produtoEditado);

    this.formulario.enable();

    this.snackBar.open('Produto atualizado com sucesso!');

  }

  voltar(){
    this.location.back();
  }
  
}


