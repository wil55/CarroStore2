import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Potencia } from '../models/potencia.model';

@Injectable({
  providedIn: 'root'
})
export class CilindradaService {
  
  constructor(private firestore: AngularFirestore) { }

  async add(cilindrada: Potencia): Promise<Potencia> {

    const docRef = await this.firestore.collection<Potencia>("potencia").add(Potencia);
    const doc = await docRef.get();

    return {
      idPotencia: doc.id,
      ...doc.data()
    } as Potencia;

  }
}
