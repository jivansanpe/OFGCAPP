import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
    let component: RegisterPage;
    let fixture: ComponentFixture<RegisterPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(RegisterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize variables', () => {
        expect(component.newUser).toBeUndefined();
        expect(component.registerUser).toBeUndefined();
        expect(component.name).toEqual('');
        expect(component.password).toEqual('');
        expect(component.confPassword).toEqual('');
        expect(component.email).toEqual('');
        expect(component.isLogged).toBeFalsy();
        expect(component.toastColor).toBeUndefined();
    });

    it('should empty the inputs', () => {
        component.name = 'username';
        component.password = 'password';
        component.confPassword = 'password';
        component.email = 'example@example.com';
        component.vaciar();
        expect(component.name).toEqual('');
        expect(component.password).toEqual('');
        expect(component.confPassword).toEqual('');
        expect(component.email).toEqual('');
    });

    it('should validate username', () => {
        expect(component.isValidUsername('')).toBeFalsy();
        expect(component.isValidUsername('username123')).toBeTruthy();
        expect(component.isValidUsername('username$%')).toBeFalsy();
        expect(component.isValidUsername('username_')).toBeFalsy();
        expect(component.isValidUsername('user name')).toBeFalsy();
    });

    it('should validate password', () => {
        expect(component.isValidPassword('')).toBeFalsy();
        expect(component.isValidPassword('password123')).toBeTruthy();
        expect(component.isValidPassword('password$%')).toBeFalsy();
        expect(component.isValidPassword('password_')).toBeFalsy();
        expect(component.isValidPassword('pass word')).toBeFalsy();
    });

    it('should return true for valid username', () => {
        const validUsername = 'john123';

        const result = component.isValidUsername(validUsername);

        expect(result).toBeTrue();
    });

    it('should return false for invalid username', () => {
        const invalidUsername = 'john!@#';

        const result = component.isValidUsername(invalidUsername);

        expect(result).toBeFalse();
    });

    it('should return true for valid password', () => {
        const validPassword = 'pass1234';

        const result = component.isValidPassword(validPassword);

        expect(result).toBeTrue();
    });

    it('should return false for invalid password', () => {
        const invalidPassword = 'password!@#';

        const result = component.isValidPassword(invalidPassword);

        expect(result).toBeFalse();
    });

    it('should call vaciar() in ionViewWillEnter()', () => {
        const component = fixture.componentInstance;
        spyOn(component, 'vaciar');
        component.ionViewWillEnter();
        expect(component.vaciar).toHaveBeenCalled();
    });

    it('should call presentToast() with the correct message when entering an invalid user', async () => {
        const component = fixture.componentInstance;
        spyOn(component, 'presentToast');
        component.name = 'user!invalid';
        component.onRegister();
        await fixture.whenStable();
        expect(component.presentToast).toHaveBeenCalledWith('Invalid username. Usernames should only contain letters and/or digits.');
    });

    it('should call presentToast() with the correct message when entering an invalid password', async () => {
        const component = fixture.componentInstance;
        spyOn(component, 'presentToast');
        component.name = 'username';
        component.email = 'test@test.com';
        component.password = 'pass!invalid';
        component.confPassword = 'pass!invalid';
        component.onRegister();
        await fixture.whenStable();
        expect(component.presentToast).toHaveBeenCalledWith('Invalid password. Passwords should only contain letters and/or digits.');
    });

    it('should call presentToast() with the correct message when entering an invalid confirm password', async () => {
        const component = fixture.componentInstance;
        spyOn(component, 'presentToast');
        component.name = 'username';
        component.email = 'test@test.com';
        component.password = 'password';
        component.confPassword = 'password1';
        component.onRegister();
        await fixture.whenStable();
        expect(component.presentToast).toHaveBeenCalledWith('Password and confirm password do not match.');
      });

});
