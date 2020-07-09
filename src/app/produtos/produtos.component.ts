import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Marca } from '../models/marca.model';
import { Cor } from '../models/cor';
import { MarcaService } from '../services/marca.service';
import { ProdutoService } from '../services/produto.service';
import { CategoriaService } from '../services/categoria.service';
import { CorService } from '../services/cor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  marcas: Observable<Marca[]>;
  categorias: Observable<Categoria[]>;
  cores: Observable<Cor[]>;
  produtos: Observable<Produto[]>
  usuario: Usuario;

  constructor(
    private router: Router,
    private marcaService: MarcaService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private corService: CorService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuariosService
  ) { }

  async ngOnInit(): Promise<void> {

    this.usuario = await this.usuarioService.getUsuarioLogado();

    this.marcas = this.marcaService.getObservable();
    this.categorias = this.categoriaService.getObservable();
    this.cores = this.corService.getObservable();
    this.produtos = this.produtoService.getObservable();


  }

  usuarioAdmin(): boolean {
    if (this.usuario && this.usuario.permissao === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  editarMarca(marca: Marca){
    this.router.navigate([`/home/marcas/${marca.id}/edicao`]);
  }

}
