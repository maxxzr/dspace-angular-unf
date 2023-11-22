/* eslint-disable no-debugger */
import { Component, OnInit } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { CommunityDataService } from 'src/app/core/data/community-data.service';
import { Observable, map } from 'rxjs';
import { getFirstSucceededRemoteData } from 'src/app/core/shared/operators';
import { PaginatedList } from 'src/app/core/data/paginated-list.model';
import { Community } from 'src/app/core/shared/community.model';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';

@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent implements OnInit{

  communities: Community[];
  constructor( private cds: CommunityDataService,public dsoNameService: DSONameService) {
    super();
  }
  ngOnInit(): void {
    const topCommunities = this.getTopCommunities();
    topCommunities.subscribe(x => {
      this.communities = x.page;
    });
  }
  private getTopCommunities(): Observable<PaginatedList<Community>> {
    return this.cds.findTop({
      currentPage: 1,
      elementsPerPage: 5
        /*sort: {
          field: options.sort.field,
          direction: options.sort.direction
        }*/
      })
      .pipe(
        getFirstSucceededRemoteData(),
        map((results) => results.payload),
      );
  }
}

