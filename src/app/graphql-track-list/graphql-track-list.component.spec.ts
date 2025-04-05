import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlTrackListComponent } from './graphql-track-list.component';
import { TrackGqlService } from '../graphql/track-gql.service';

describe('GraphqlTrackListComponent', () => {
  let component: GraphqlTrackListComponent;
  let fixture: ComponentFixture<GraphqlTrackListComponent>;

  let mockTrackGqlService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlTrackListComponent],
      providers: [{ provide: TrackGqlService, useValue: mockTrackGqlService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphqlTrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
