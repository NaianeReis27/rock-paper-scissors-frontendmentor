import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/core/services/modal.service';
import { Modal } from 'src/app/shared/interfaces/interfaces';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
modalState! : Modal;
constructor(public modalService: ModalService){}

ngOnInit(): void {
  this.modalService
      .getState()
      .subscribe(value => this.modalState = value);
}
}