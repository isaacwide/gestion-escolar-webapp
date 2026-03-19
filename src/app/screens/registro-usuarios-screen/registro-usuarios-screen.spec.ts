import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariosScreen } from './registro-usuarios-screen';

describe('RegistroUsuariosScreen', () => {
  let component: RegistroUsuariosScreen;
  let fixture: ComponentFixture<RegistroUsuariosScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuariosScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuariosScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
