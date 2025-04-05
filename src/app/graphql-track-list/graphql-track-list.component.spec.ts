import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlTrackListComponent } from './graphql-track-list.component';

describe('GraphqlTrackListComponent', () => {
  let component: GraphqlTrackListComponent;
  let fixture: ComponentFixture<GraphqlTrackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlTrackListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlTrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
