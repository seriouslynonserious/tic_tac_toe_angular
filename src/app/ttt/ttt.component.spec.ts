import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TttComponent } from './ttt.component';

describe('TttComponent', () => {
  let component: TttComponent;
  let fixture: ComponentFixture<TttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
