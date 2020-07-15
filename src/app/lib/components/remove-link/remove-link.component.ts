import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ILink } from '../../interfaces';
import { Store } from '@ngrx/store';
import { LinkActions } from '../../store/link';

@Component({
  selector: 'app-remove-link',
  templateUrl: './remove-link.component.html',
  styleUrls: ['./remove-link.component.scss']
})
export class RemoveLinkComponent implements OnInit {

  link: ILink;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  remove() {
    this.toastr.success(`${this.link.name.toUpperCase()} removed`);
    this.store.dispatch(LinkActions.remove({ id: this.link.id }));
  }
}
