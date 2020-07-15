import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './lib/services';
import { selectAllLinks, LinkActions } from './lib/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit() {
    const links = this.localStorageService.get("links");
    this.store.dispatch(LinkActions.load({ links }));

    this.store.select(selectAllLinks).subscribe(links => this.localStorageService.set("links", links));
  }
}
