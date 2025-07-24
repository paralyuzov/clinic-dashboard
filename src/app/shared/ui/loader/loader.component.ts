import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserService } from '../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-loader',
  imports: [ProgressSpinnerModule, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {

  userService = inject(UserService);
  loading$ = this.userService.loading$;

  ngOnInit() {
    this.userService.verifyUser()
  }

}
