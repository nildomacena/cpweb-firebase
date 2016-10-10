import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

declare var firebase: any;

@Injectable()
export class ProcessoService {
  refProcessos: any;
  rootProcessos: any;
  constructor(private af: AngularFire) {
    this.refProcessos = firebase.database().ref().child('processos');
    this.rootProcessos = firebase.database().ref('/processos')
  }
  
  saveProcesso(processo:any){
    console.log("saveProcesso");
    this.refProcessos.push(processo)
      .then(data => console.log(data));
  }

  getProcessos() {
    return this.af.database.list('processos');
  }

  findProcessoById(id: string){
    return this.af.database.object('/processos/'+id);
  }
  updateProcesso(processo:any, id:string){
    console.log(processo);
    console.log(id);
    return this.af.database.object('/processos/'+id).update(processo);
  }
}
