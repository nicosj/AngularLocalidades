import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocacionService} from "../../services/locacion.service";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-locacion',
  templateUrl: './locacion.component.html',
  styleUrls: ['./locacion.component.css']
})
export class LocacionComponent implements OnInit {
  locaciones:any[]=[]
  accion ='Agregar'
  form: FormGroup
  id: number |undefined
  constructor(private fb: FormBuilder,private toastr: ToastrService, private _locacionService : LocacionService) {
    this.form=this.fb.group({
      paises:[''],
      provincias:[''],
      departamentos:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerLocaciones()
  }
  obtenerLocaciones(){
    this._locacionService.getAlL().subscribe(data=>{
      this.locaciones=data
    });
  }
  guardarLocalidad(){

    const lugar : any =
      {
        "paises": this.form.get("paises")?.value,
        "provincia": {
          "provincias": this.form.get("provincias")?.value,
          "depto": {
            "departamentos" : this.form.get("departamentos")?.value
          }
        }
      }

    if((lugar.provincia.depto.departamentos == '' || lugar.provincia.depto.departamentos==null )||
      ( lugar.paises==  ''|| lugar.paises==null) ||
      (lugar.provincia.provincias==''|| lugar.provincia.provincias==null )
    ){
      this.toastr.info('complete el formulario', 'atenicon!!!');
    } else{
    if(this.id== undefined){
      this._locacionService.save(lugar).subscribe(data=>{
        this.obtenerLocaciones()
        this.toastr.success('Se guardo', 'ok');
      })}
      else
      { lugar.id=this.id
        this._locacionService.update(lugar).subscribe(data => {

          this.accion="agregar"
          this.id=undefined
          this.obtenerLocaciones()
          this.toastr.success('Se guardo', 'ok');
        },error => {console.log(error)})
      }
    }

    this.form.reset()

  }
  eliminar(id:number){
    this._locacionService.delete(id).subscribe(data=>{
      this.toastr.error('Se elimino', 'ok');
    this.obtenerLocaciones()
    })
  }
  editar(lugar:any){
    this.accion="Editar"
    this.id=lugar.id
    this.form.patchValue({
      paises:lugar.paises,
      provincias:lugar.provincia.provincias,
      departamentos:lugar.provincia.depto.departamentos
    })
  }
}
