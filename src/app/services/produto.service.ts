import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Produto[]> {
    return this.firestore.collection<Produto>('produtos').valueChanges({ idField: 'id' });
}

  private convertToProduto(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Produto {

    const dados = document.data();

    const produto = {
      id: document.id,
      ...dados
    } as Produto;

    if (dados.dataEdicao){
      produto.dataEdicao = dados.dataEdicao.toDate();
    }

    if (dados.dataCadastro){
      produto.dataCadastro = dados.dataCadastro.toDate();
    }

    return produto;

  }


  async add(produto: Produto): Promise<Produto> {

    const documentRef = await this.firestore.collection<Produto>('produtos').add(produto);
    const document = await documentRef.get();

    return this.convertToProduto(document);

  }

  async get(id: string): Promise<Produto> {

    const document = await this.firestore.collection<Produto>('produtos').doc(id).get().toPromise();

    return this.convertToProduto(document);

  }

  async update(id: string, produto: Produto): Promise<void> {

    await this.firestore.collection<Produto>('produtos').doc(id).update(produto);

  }

}
