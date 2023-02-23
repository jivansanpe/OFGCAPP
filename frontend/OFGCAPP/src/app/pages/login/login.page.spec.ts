import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('empty login field', () => {
        component.email = "";
        component.password = "";
        expect(component.onLogin()).toBeFalsy();
    });

    it('empty email field', () => {
        component.email = "";
        component.password = "contraseña123";
        spyOn(component, 'presentToast');
        expect(component.onLogin()).toBeFalsy();
        expect(component.presentToast).toHaveBeenCalledWith('Invalid email address. The email adress must have a valid format.');
    });

    it('empty password field', () => {
        component.email = "correo@ejemplo.com";
        component.password = "";
        spyOn(component, 'presentToast');
        expect(component.onLogin()).toBeFalsy();
        expect(component.presentToast).toHaveBeenCalledWith('Invalid password. Passwords should only contain letters and/or digits.');
    });

    it('invalid email address', () => {
        component.email = "correo-invalido";
        component.password = "contraseña123";
        spyOn(component, 'presentToast');
        component.onLogin();
        expect(component.presentToast).toHaveBeenCalledWith("Invalid email address. The email adress must have a valid format.");
    });

    it('invalid password', () => {
        component.email = "correo@ejemplo.com";
        component.password = "contraseña con espacios";
        spyOn(component, 'presentToast');
        component.onLogin();
        expect(component.presentToast).toHaveBeenCalledWith("Invalid password. Passwords should only contain letters and/or digits.");
    });
    
});
