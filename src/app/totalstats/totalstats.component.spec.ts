import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalstatsComponent } from './totalstats.component';

describe('TotalstatsComponent', () => {
  let component: TotalstatsComponent;
  let fixture: ComponentFixture<TotalstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalstatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
