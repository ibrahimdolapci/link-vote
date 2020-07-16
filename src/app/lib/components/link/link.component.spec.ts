import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let modalService: BsModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [
        RouterTestingModule, 
        ModalModule.forRoot(), 
        ToastrModule.forRoot()
      ],
      declarations: [LinkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.link = {
      name: 'Medium',
      url: 'https://medium.com',
      id: 5,
      vote: 0,
      modifiedDate: 1594845815689
    };
    modalService = TestBed.get(BsModalService);
    fixture.detectChanges();
  });

  it('should dialog modal be appear when click remove button', () => {
    clickByCSS('.remove-button');

    expect(modalService.getModalsCount()).toBeGreaterThanOrEqual(1);
  });

  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  };
});
