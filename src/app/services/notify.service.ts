import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  // Notify Emitter

  tokenNotify$    = new EventEmitter();
  user$           = new EventEmitter();
  session$        = new EventEmitter<boolean>();
  actualizarProductos$        = new EventEmitter<boolean>();

  constructor() { }
}
