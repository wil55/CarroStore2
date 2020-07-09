import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Potencia } from '../models/potencia.model';

@Injectable({
  providedIn: 'root'
})
export class PotenciaService {
  
  constructor(private firestore: AngularFirestore) { }

  async add(potencia: Potencia): Promise<Potencia> {

    const docRef = await this.firestore.collection<Potencia>("potencia").add(potencia);
    const doc = await docRef.get();

    return {
      idPotencia: doc.id,
      ...doc.data()
    } as Potencia;

  }

}