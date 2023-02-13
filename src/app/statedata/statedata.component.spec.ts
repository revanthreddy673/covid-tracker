import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatedataComponent } from './statedata.component';

describe('StatedataComponent', () => {
  let component: StatedataComponent;
  let fixture: ComponentFixture<StatedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
