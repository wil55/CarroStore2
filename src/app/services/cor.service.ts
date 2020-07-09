import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Cor } from '../models/cor';



@Injectable({
  providedIn: 'root'
})
export class CorService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Cor[]> {
    return this.firestore.collection<Cor>('cor').valueChanges({ idField: 'id' });
}

  private convertTocor(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Cor {

    const dados = document.data();

    const cor = {
      id: document.id,
      ...dados
    } as Cor;

    if (dados.dataEdicao){
      cor.dataEdicao = dados.dataEdicao.toDate();
    }

    if (dados.dataCadastro){
      cor.dataCadastro = dados.dataCadastro.toDate();
    }

    return cor;

  }


  async add(cor: Cor): Promise<Cor> {

    const documentRef = await this.firestore.collection<Cor>('cor').add(cor);
    const document = await documentRef.get();

    return this.convertTocor(document);

  }

  async get(id: string): Promise<Cor> {

    const document = await this.firestore.collection<Cor>('cor').doc(id).get().toPromise();

    return this.convertTocor(document);

  }

  async update(id: string, cor: Cor): Promise<void> {

    await this.firestore.collection<Cor>('cor').doc(id).update(cor);

  }
}
