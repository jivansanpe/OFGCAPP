import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // obtener la instancia del Router
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('log in as admin renders properly', () => {
    component.isLoggedIn = false;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.logText').textContent).toContain('Log in as admin');
  });

  it('displays login button when user is not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const loginButton = compiled.querySelector('.logText');
    expect(loginButton.textContent).toContain('Log in as admin');
  });

  it('navigates to event list page when tap to start is clicked', () => {
    spyOn(component, 'goToEventlist');
    const compiled = fixture.debugElement.nativeElement;
    const tapToStart = compiled.querySelector('.tap ion-text');
    tapToStart.click(); // cambiando dispatchEvent por click
    expect(component.goToEventlist).toHaveBeenCalled();
  });

  it('displays image logo properly', () => {
    const compiled = fixture.debugElement.nativeElement;
    const image = compiled.querySelector('ion-img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('assets/images/logo.jpg');
  });

  it('executes logOut() function when logout button is clicked', () => {
    spyOn(component, 'logOut');
    component.isLoggedIn = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const logoutButton = compiled.querySelector('.logText');
    logoutButton.click(); // cambiando dispatchEvent por click
    expect(component.logOut).toHaveBeenCalled();
  });

  it('sets isLoggedIn to true when token is present in sessionStorage', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue('dummy_token');
    component.isLogged();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('sets isLoggedIn to false when token is not present in sessionStorage', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
    component.isLogged();
    expect(component.isLoggedIn).toBeFalse();
  });

});
