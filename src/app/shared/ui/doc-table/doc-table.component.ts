import { Component, inject, input, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule,Table } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { DoctorDetailsComponent } from '../../../features/doctor-details/doctor-details.component';
import { Doctor } from '../../../core/models/doctor.model';


@Component({
  selector: 'app-doc-table',
  imports: [TableModule, InputTextModule],
  templateUrl: './doc-table.component.html',
  styleUrl: './doc-table.component.css',
  providers: [DialogService]
})
export class DocTableComponent  {
  @ViewChild('dt') dt: Table | undefined;

  dialogService = inject(DialogService);
  doctors = input<Doctor[]>([]);
  visible: boolean = false;


  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openDoctorDetails(id:string) {
      const ref = this.dialogService.open(DoctorDetailsComponent, {
        modal: true,
        breakpoints: { '1199px': '75vw', '575px': '90vw' },
        draggable: false,
        resizable: false,
        focusOnShow: false,
        width: '30vw',
        data:{
          doctorId: id
        }
      });

    }

}
