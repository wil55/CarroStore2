import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Categoria[]> {
    return this.firestore.collection<Categoria>('categoria').valueChanges({ idField: 'id' });
  }

  private convertToCategoria(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Categoria {

    const dados = document.data();

    const categoria = {
      id: document.id,
      ...dados
    } as Categoria;

    if (dados.dataEdicao) {
      categoria.dataEdicao = dados.dataEdicao.toDate();
    }

    if (dados.dataCadastro) {
      categoria.dataCadastro = dados.dataCadastro.toDate();
    }

    return categoria;

  }


  async add(categoria: Categoria): Promise<Categoria> {

    const documentRef = await this.firestore.collection<Categoria>('categoria').add(categoria);
    const document = await documentRef.get();

    return this.convertToCategoria(document);

  }

  async get(id: string): Promise<Categoria> {

    const document = await this.firestore.collection<Categoria>('categoria').doc(id).get().toPromise();

    return this.convertToCategoria(document);

  }

  async update(id: string, categoria: Categoria): Promise<void> {

    await this.firestore.collection<Categoria>('categoria').doc(id).update(categoria);

  }
}
