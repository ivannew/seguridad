import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncriptadoComponent } from './encriptado.component';

describe('EncriptadoComponent', () => {
  let component: EncriptadoComponent;
  let fixture: ComponentFixture<EncriptadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncriptadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncriptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
