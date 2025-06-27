import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavigationComponent', () => {
  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('should render two navigation buttons with correct labels', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].nativeElement.textContent).toContain('📊 Dashboard');
    expect(buttons[1].nativeElement.textContent).toContain('🎮 Pokémon');
  });

  it('should have correct routerLink paths', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    expect(buttons[0].attributes['ng-reflect-router-link']).toBe('/dashboard');
    expect(buttons[1].attributes['ng-reflect-router-link']).toBe('/pokemon');
  });
});
