import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { NewUser } from '../models/new-user';
import { Login } from '../models/login';
import { JwtDTO } from '../models/jwt-dto';

describe('AuthService', () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        authService = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    describe('newUser', () => {
        it('should send a POST request to the API with the new user data', () => {
            const newUser: NewUser = {
                name: 'test user',
                email: 'test@example.com',
                password: 'testpassword',
                confirm_password: ''
            };
            authService.newUser(newUser).subscribe();
            const req = httpMock.expectOne('http://10.0.2.2:8000/api/register');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(newUser);
            req.flush({});
        });
    });

    describe('loginUser', () => {
        it('should send a POST request to the API with the login data and return the token', () => {
            const loginUser: Login = {
                email: 'test@example.com',
                password: 'testpassword'
            };
            const jwtDTO: JwtDTO = {
                token: 'testtoken',
                type: '',
                userName: '',
                authorities: []
            };
            authService.loginUser(loginUser).subscribe(res => {
                expect(res).toEqual(jwtDTO);
            });
            const req = httpMock.expectOne('http://10.0.2.2:8000/api/login');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(loginUser);
            req.flush(jwtDTO);
        });
    });
});
