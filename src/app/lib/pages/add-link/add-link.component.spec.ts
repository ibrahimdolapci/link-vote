import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkComponent } from './add-link.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddLinkComponent', () => {
  let component: AddLinkComponent;
  let fixture: ComponentFixture<AddLinkComponent>;
  let toastr: ToastrService;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [AddLinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkComponent);
    component = fixture.componentInstance;

    fb = TestBed.get(FormBuilder);

    component.formGroup = fb.group({
      name: ['StackBlitz', Validators.required],
      url: ['https://stackblitz.com', Validators.required]
    });
    toastr = TestBed.get(ToastrService);

    fixture.detectChanges();
  });

  it('should toast alert message will be appear if the link is successfully added', () => {
    clickByCSS("button[type='submit']");

    expect(toastr.currentlyActive).toBe(1);
  });

  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  };
});
