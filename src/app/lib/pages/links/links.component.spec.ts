import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LinksComponent } from './links.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from 'src/app/app-routing.module';
import { Location } from "@angular/common";
import { LinkComponent } from '../../components';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let location: Location;
  let mockStore: MockStore;

  const initialState = {
    links: {
      ids: [5, 4, 3, 2, 1, 0],
      entities: {
        '0': {
          name: 'Hacker News',
          url: 'https://news.ycombinator.com/',
          id: 0,
          vote: 1,
          modifiedDate: 1594845715616
        },
        '1': {
          name: 'Product Hunt',
          url: 'https://producthunt.com/',
          id: 1,
          vote: 2,
          modifiedDate: 1594845735703
        },
        '2': {
          name: 'Reddit',
          url: 'https://www.reddit.com/',
          id: 2,
          vote: 3,
          modifiedDate: 1594845758630
        },
        '3': {
          name: 'Quora',
          url: 'https://www.quora.com/',
          id: 3,
          vote: 4,
          modifiedDate: 1594845781424
        },
        '4': {
          name: 'Stack Overflow',
          url: 'https://stackoverflow.com/',
          id: 4,
          vote: 5,
          modifiedDate: 1594845795460
        },
        '5': {
          name: 'Medium',
          url: 'https://medium.com',
          id: 5,
          vote: 6,
          modifiedDate: 1594845815689
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      declarations: [LinksComponent, LinkComponent],
      imports:
        [
          RouterTestingModule.withRoutes(routes),
          PaginationModule.forRoot(),
          ModalModule.forRoot(),
          BsDropdownModule.forRoot(),
          BrowserAnimationsModule,
          FormsModule
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should sort links by id', () => {
    const links = component.links;
    let isSortedById = true;

    for (let i = 0; i < links.length - 2; i++) {
      if (links[i].id < links[i + 1].id) {
        isSortedById = false;
        break;
      }
    }

    expect(isSortedById).toBeTrue();
  });

  it('should sort links by vote in descending order after click to Most Voted', fakeAsync(() => {
    clickByCSS('#order-by');
    tick();
    clickByCSS('#order-by-desc');
    tick();

    const links = component.links;
    let isSortedByVoteDesc = true;


    for (let i = 0; i < links.length - 2; i++) {
      if (links[i].vote < links[i + 1].vote) {
        isSortedByVoteDesc = false;
        break;
      }
    }
    expect(isSortedByVoteDesc).toBeTrue();
  }));

  it('should sort links by vote in ascending order after click to Less Voted', fakeAsync(() => {
    clickByCSS('#order-by');
    tick();
    clickByCSS('#order-by-asc');
    tick();

    const links = component.links;

    let isSortedByVoteAsc = true;

    for (let i = 0; i < links.length - 2; i++) {
      if (links[i].vote > links[i + 1].vote) {
        isSortedByVoteAsc = false;
        break;
      }
    }

    expect(isSortedByVoteAsc).toBeTrue();
  }));

  it('should limit link count to 5 and pagination will be visible', () => {

    const links = component.links;
    const el = findElementByCss('pagination');

    expect(links.length <= 5 && el).toBeTruthy();
  });

  it('the link should be highlighted and the delete button should appear in the upper right corner', () => {

    let linkElement = findElementByCss('app-link:first-child');
    linkElement.dispatchEvent(new MouseEvent('mouseover'));
    fixture.detectChanges();


    const isHighlighted = linkElement.classList.contains('highlighted');
    const removeButton = findElementByCss('app-link:first-child .remove-button');
    const isRemoveButtonDisplayed = removeButton.style.display != 'none';

    expect(isHighlighted && isRemoveButtonDisplayed).toBeTrue();
  });

  function clickByCSS(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    fixture.detectChanges();
  };

  function findElementByCss(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    const el: HTMLElement = debugElement.nativeElement;
    return el;
  };
});
