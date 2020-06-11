import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private firestore: AngularFirestore) { }

  getObservable(): Observable<Marca[]> {
    return this.firestore.collection<Marca>('marca').valueChanges({ idField: 'id' });
}

  private convertToMarca(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Marca {

    const dados = document.data();

    
    const marca = {
      id: document.id,
      ...dados
    } as Marca;

    if (dados.dataEdicao){
      marca.dataEdicao = dados.dataEdicao.toDate();
    }

    if (dados.dataCadastro){
      marca.dataCadastro = dados.dataCadastro.toDate();
    }

    return marca;

  }


  async add(marca: Marca): Promise<Marca> {

    const documentRef = await this.firestore.collection<Marca>('marca').add(marca);
    const document = await documentRef.get();

    return this.convertToMarca(document);

  }

  async get(id: string): Promise<Marca> {

    const document = await this.firestore.collection<Marca>('marca').doc(id).get().toPromise();

    return this.convertToMarca(document);

  }

  async update(id: string, marca: Marca): Promise<void> {

    await this.firestore.collection<Marca>('marca').doc(id).update(marca);

  }
  
}
