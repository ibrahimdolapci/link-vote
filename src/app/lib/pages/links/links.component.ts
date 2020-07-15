import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RemoveLinkComponent } from '../../components';
import { Store } from '@ngrx/store';
import { selectAllLinks, LinkActions } from '../../store';
import { ILink } from '../../interfaces';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinksComponent implements OnInit {

  links: ILink[] = [];
  totalItems: ILink[] = [];
  currentPage = 1;
  limit = 5;
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private bsModal: BsModalService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    const queryParams$ = this.route.queryParams;
    const links$ = this.store.select(selectAllLinks);

    combineLatest(links$, queryParams$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([totalItems, { orderBy, page = 1 }]) => {
        let links = [...totalItems];

        if (orderBy) {
          const direction = orderBy == 'asc' ? -1 : 1;
          links = links.sort((a, b) => direction * (b.modifiedDate - a.modifiedDate));
          links = links.sort((a, b) => direction * (b.vote - a.vote));
        }

        const start = (page - 1) * this.limit;
        const end = start + this.limit;
        links = links.slice(start, end);

        this.links = links;
        this.totalItems = totalItems;
        this.currentPage = +page;
      });
  }

  upVote(id: number) {
    this.store.dispatch(LinkActions.upVote({ id }))
  }

  downVote(id: number) {
    this.store.dispatch(LinkActions.downVote({ id }))
  }

  remove(link: ILink) {
    this.bsModal.show(RemoveLinkComponent, { initialState: { link }, class: 'modal-sm' });
  }

  pageChanged(page) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { page }, queryParamsHandling: 'merge' })
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
