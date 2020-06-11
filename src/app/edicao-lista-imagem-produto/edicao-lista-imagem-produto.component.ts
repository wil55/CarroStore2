import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto.model';

export class Imagem {
  url: string;
  arquivo: File;
}

@Component({
  selector: 'app-edicao-lista-imagem-produto',
  templateUrl: './edicao-lista-imagem-produto.component.html',
  styleUrls: ['./edicao-lista-imagem-produto.component.scss']
})
export class EdicaoListaImagemProdutoComponent implements OnInit {

  carregando: boolean;
  idProduto: string;
  descricaoProduto: string;
  imagens: Imagem[] = [];

  constructor(
    private activitedRoute: ActivatedRoute,
    private produtoService: ProdutoService
  ) { }

  async ngOnInit() {

    this.carregando = true;

    this.idProduto = this.activitedRoute.snapshot.paramMap.get('id');

    const produto = await this.produtoService.get(this.idProduto);

    this.descricaoProduto = `${produto.nome} - ${produto.potencia}`;

    if (produto.imagens) {

      this.imagens = produto.imagens.map<Imagem>(urlImagem => {
        return { url: urlImagem, arquivo: null };
      });

    }

    this.carregando = false;

  }

  adicionarImagens(event: any){

    const arquivos = event.target.files as FileList;

    for(let index = 0; index < arquivos.length; index++){

      const arquivo = arquivos[index];

      this.imagens.push({ url: null, arquivo: arquivo });

    }
  }

  async atualizarImagens(){

    const imagensProduto = this.imagens.filter(x => x.url).map(x => x.url);
    const produto = {imagens: imagensProduto} as Produto;

    await this.produtoService.update(this.idProduto, produto);

  }

}
