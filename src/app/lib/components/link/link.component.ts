import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { ILink } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { LinkActions } from '../../store';
import { RemoveLinkComponent } from '../remove-link/remove-link.component';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input() link: ILink;
  @HostBinding('class.highlighted') highlighted: boolean;

  @HostListener('mouseover') onMouseOver() { this.highlighted = true; };

  @HostListener('mouseout') onMouseOut() { this.highlighted = false; }

  constructor(
    private route: ActivatedRoute,
    private bsModal: BsModalService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  upVote(id: number) {
    this.store.dispatch(LinkActions.upVote({ id }))
  }

  downVote(id: number) {
    this.store.dispatch(LinkActions.downVote({ id }))
  }

  orderBy(direction: string) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { orderBy: direction }, queryParamsHandling: 'merge' })
  }

  remove(link: ILink) {
    this.bsModal.show(RemoveLinkComponent, { initialState: { link }, class: 'modal-sm' });
  }

}
