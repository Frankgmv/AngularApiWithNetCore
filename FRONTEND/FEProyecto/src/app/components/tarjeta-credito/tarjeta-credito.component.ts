import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Subscriber } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [];
  action = "Agregar"
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    return this._tarjetaService.getTarjetas().subscribe(data => {
      this.listTarjetas = data;
      console.log(this.listTarjetas);

    }, error => {
      console.info(error)
    })
  }

  agregarTarjeta() {

    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if (this.id == undefined) {

      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success(`tarjeta de ${tarjeta.titular} agregada`, 'Tarjeta Agregada');
        this.obtenerTarjetas()
        this.form.reset();
      }, error => {
        this.toastr.error("Uppss Error capa 8", 'Error');
      })
    } else {
      tarjeta.id = this.id
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.action = 'Agregar'
        this.form.reset();
        this.id = undefined;
        this.toastr.info("Tarjeta actualizada exitosamente", 'Tarjeta Actualizada');
        this.obtenerTarjetas();
        
      }, error => {
        this.toastr.error("Uppss Error capa 8", 'Error');
      })
    }
  }

  eliminarTarjeta(i: number) {

    this._tarjetaService.deleteTarjeta(i).subscribe(data => {
      this.toastr.error(`tarjeta eliminada exitosamente`, 'Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error)
    })
  }

  EditTarjeta(tarjeta: any) {
    this.action = "Editar";
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    })
  }
}
