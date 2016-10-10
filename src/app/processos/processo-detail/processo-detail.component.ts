import { Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { Objeto, LISTA_OBJETOS } from '../../services';
import { FormGroup, NgForm, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessoService} from '../../services/processo.service';

@Component({
  selector: 'cp-processo',
  templateUrl: 'processo-detail.component.html',
  styleUrls: ['processo-detail.component.css']
})

export class ProcessoDetailComponent implements OnInit {

  processo: any;
  formReady: boolean = false;
  objetos: any[];
  teste = {
    numero: 'testando'
  };
  ngOnInit(){
    let key: string;
    this.route.params
      .subscribe(data => key = data['id']);
    this.prcSrv.findProcessoById(key)
      .subscribe(data => {
        console.log(this.processo);
        this.processo = data;
        this.formReady = true;
        console.log(this.formReady);
        this._cdRef.markForCheck();
      });
 }

  constructor(private prcSrv: ProcessoService, private route: ActivatedRoute, private _cdRef: ChangeDetectorRef){
    this.objetos = LISTA_OBJETOS;
    this.processo = {
      numero: ''
    };
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }
}

