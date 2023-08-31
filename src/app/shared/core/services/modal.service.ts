import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modal } from '../../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private state$ = new BehaviorSubject<Modal>({
    isOpen: false,
  });

  getState(): Observable<Modal> {
    return this.state$.asObservable();
  }

  hide() {
    return this.state$.next({
      isOpen: false,
    });
  }
  show() {
    return this.state$.next({
      isOpen: true,
    });
  }
}
