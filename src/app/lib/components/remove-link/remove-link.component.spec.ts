import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLinkComponent } from './remove-link.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RemoveLinkComponent', () => {
  let component: RemoveLinkComponent;
  let fixture: ComponentFixture<RemoveLinkComponent>;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), BsModalRef],
      imports: [
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [RemoveLinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveLinkComponent);
    component = fixture.componentInstance;
    component.link = {
      name: 'Medium',
      url: 'https://medium.com',
      id: 5,
      vote: 0,
      modifiedDate: 1594845815689
    };

    toastr = TestBed.get(ToastrService);
    fixture.detectChanges();
  });

  it('should toast alert message will be appear', () => {
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
