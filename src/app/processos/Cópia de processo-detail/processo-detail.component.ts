import { Component, OnInit, ElementRef} from '@angular/core';
import { Objeto, LISTA_OBJETOS } from '../../services';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessoService} from '../../services/processo.service';
import { AuthService } from '../../services';

declare var jQuery: any;

@Component({
  selector: 'cp-processo',
  templateUrl: 'processo-detail.component.html',
  styleUrls: ['processo-detail.component.css']
})

export class ProcessoDetailComponent implements OnInit {
  outroSelected: boolean;
  objetos: Objeto[];
  select = document.getElementsByTagName('select');
  myForm: FormGroup;
  precosItens: any[] = [''];
  itens:any;
  myTable: FormGroup;
  parcelada:any; 
  valorTotalItens:number;
  key: any;
  processoSelected: any;
  constructor(
    private router:Router, 
    private formBuilder: FormBuilder, 
    private eleRef: ElementRef, 
    private processoService: ProcessoService,
    private authService: AuthService,
    private route: ActivatedRoute
  ){ 
    this.objetos = LISTA_OBJETOS;
    this.valorTotalItens = 0;
  }

  ngOnInit(){   
    this.myForm = this.formBuilder.group({
      'numero': ['', Validators.required],
      'ano': ['', Validators.required],
      'objeto': ['', Validators.required],
      'fornecedor': ['', Validators.required],
      'itens': this.formBuilder.array([
        this.initItens()
      ]),
      'rateio': this.formBuilder.array([
        this.initRateio()
      ]),
      'endereco_entrega': this.formBuilder.group({
        'almox_central': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'mesm': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'heha': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'hepr': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'almox_sede': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        })
      }),
      'forma_entrega': this.formBuilder.group({
        'unica': true,
        'parcelada': false
      })
    });
    
    this.route.params.subscribe(data => {
      this.key = data['id'];
      this.processoService.findProcessoById(this.key)
        .subscribe(processo => {
          this.processoSelected = processo;
          this.populateForm();
          this.disableForm();
          console.log("Processo selecionado: ",this.processoSelected);
        });
    });

    let isAuthenticated;
    this.authService.isAuthenticated()
      .subscribe(value => isAuthenticated = value);
    if(!isAuthenticated){    
      this.router.navigate(['login']);
    }
    console.log("thiskey: ", this.key);
  }

  populateForm(){
    this.myForm = this.formBuilder.group({
      'numero': [this.processoSelected.numero, Validators.required],
      'ano': [this.processoSelected.ano, Validators.required],
      'objeto': [this.processoSelected.objeto, Validators.required],
      'fornecedor': [this.processoSelected.fornecedor, Validators.required],
      'itens': this.formBuilder.array([
        this.initItens()
      ]),
      'rateio': this.formBuilder.array([
        this.initRateio()
      ]),
      'endereco_entrega': this.formBuilder.group({
        'almox_central': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'mesm': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'heha': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'hepr': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        }),
        'almox_sede': this.formBuilder.group({
          'check': false,
          'gestor': {value: '', disabled:true}
        })
      }),
      'forma_entrega': this.formBuilder.group({
        'unica': true,
        'parcelada': false
      })
    });
  }

  disableForm(){
    this.myForm.disable();
  }

  enableForm(){
    this.myForm.enable();
  }

  initItens(){ 
    return this.formBuilder.group({
        'ata_item': ['', Validators.required],
        'numero_item': ['', Validators.required],
        'vigencia': ['', Validators.required],
        'descricao_item': ['', Validators.required],
        'quantidade_item': ['', Validators.required],
        'preco_item': ['', Validators.required],
      })
  }
  initRateio(): any{
    return this.formBuilder.group({
      'heha': [''],
      'hepr': [''],
      'mesm': [''],
      'cpml': [''],
      'cer': [''],
      'svo': [''],
      'etsal': [''],
      'sede': [''],
    });
  }

  onSubmit(){
    this.processoService.updateProcesso(this.myForm.value, this.key)
      .then(value => {
        console.log(value);
        alert("Processo atualizado com sucesso");
        this.router.navigate(['/processos']);
      });
  }

   round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  calculaValor(i:number) {
    const preco_item = <FormArray> this.myForm.controls['itens'].value[i].preco_item;
    const quantidade_item = <FormArray> this.myForm.controls['itens'].value[i].quantidade_item;
    let resultado = +preco_item * +quantidade_item;
    if(resultado){
      this.precosItens[this.precosItens.length - 1] = this.round(resultado,2).toFixed(2);
    }
    this.valorTotalItens = 0;
    for(let i=0; i < this.precosItens.length; i++ )
      this.valorTotalItens += +this.precosItens[i];
  }

  onAddItem(){
    console.log(this.precosItens);
    const control = <FormArray>this.myForm.controls['itens'];
    let index = control.length;
    control.push(this.initItens());
    this.precosItens.push('');
    this.addItemRateio();
    console.log(this.myForm);

  }

  addItemRateio(){
    const control = <FormArray>this.myForm.controls['rateio'];
    control.push(this.initRateio());

  }

  onRemoveItens(){
    const controlItem = <FormArray>this.myForm.controls['itens'];
    controlItem.removeAt(controlItem.length -1);
    const controlRateio = <FormArray>this.myForm.controls['rateio'];
    controlRateio.removeAt(controlRateio.length -1);
    this.precosItens.pop();
    console.log(this.myForm);
    
  }
  
  onSelect(f){
    console.log(f);
  }
  onOutroSelected(selected: boolean){
    console.log("entrou no selected");
    this.outroSelected = selected;
  }
  
  onSelectFormaEntrega(radio){
    this.parcelada = radio;
    console.log("Radio: ",radio);
  }

  consoleMyForm(){
    console.log(this.myForm);  
  }
  onChangeEndereco(endereco?:string){
    let control = <FormArray>this.myForm.controls['endereco_entrega'];
    let controlEndereco = <FormArray>control.controls[endereco];
    let controlGestor = <FormArray>controlEndereco.controls['gestor'];
    let controlCheck = <FormArray>controlEndereco.controls['check'];
    if(controlCheck.value){
      controlGestor.disable();
    }
    else
      controlGestor.enable();
  }
}

