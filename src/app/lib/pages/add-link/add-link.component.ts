import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { LinkActions } from '../../store';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss']
})
export class AddLinkComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  add() {
    const link = this.formGroup.value;
    this.store.dispatch(LinkActions.add(link));

    this.formGroup.reset();
    this.toastr.success(`${link.name.toUpperCase()} added`);
  }

  goBack() {
    this.location.back();
  }
}
