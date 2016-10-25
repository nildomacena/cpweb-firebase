import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processo-master',
  templateUrl: './processo-master.component.html',
  styleUrls: ['./processo-master.component.css']
})
export class ProcessoMasterComponent implements OnInit {
  processos: any[];
  filteredProcessos: any[];
  constructor(private prcSrv: ProcessoService, private router: Router) { }

  ngOnInit() {
    this.prcSrv.getProcessos().subscribe( (list) => {
      this.processos = this.filteredProcessos = list;
      console.log('processos: ',this.processos);
    });
  }
  listProcessos(){
    console.log(this.processos);
  }
  search(search: string){
    this.filteredProcessos = this.processos.filter(processo => processo.fornecedor.toUpperCase().includes(search.toUpperCase()) || 
                                                               processo.objeto.toUpperCase().includes(search.toUpperCase()) ||
                                                               processo.numero.toUpperCase().includes(search.toUpperCase()) ||
                                                               processo.ano.toUpperCase().includes(search.toUpperCase())
                                                               );
  }

  goToDetails(key: string){
    this.router.navigate(['processo',key]);
    console.log(key);
  }

}
