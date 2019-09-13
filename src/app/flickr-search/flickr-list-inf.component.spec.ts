import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrListInfComponent } from './flickr-list-inf.component';

describe('FlickrListInfComponent', () => {
  let component: FlickrListInfComponent;
  let fixture: ComponentFixture<FlickrListInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlickrListInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrListInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
