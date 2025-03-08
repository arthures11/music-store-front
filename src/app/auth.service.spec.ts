import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and store token', () => {
    const mockResponse = { access_token: 'test_token' };

    service.login('testuser', 'testpassword').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.getToken()).toBe('test_token');
      expect(service.isAuthenticated()).toBe(true);
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:8000/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');

    // Check the request body
    const expectedBody = new URLSearchParams();
    expectedBody.set('username', 'testuser');
    expectedBody.set('password', 'testpassword');
    expect(req.request.body.toString()).toEqual(expectedBody.toString());

    req.flush(mockResponse);
  });



  it('should logout and remove token', () => {
    localStorage.setItem('access_token', 'initial_token');
    expect(service.getToken()).toBe('initial_token');
    expect(service.isAuthenticated()).toBe(true);

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.isAuthenticated()).toBe(false);
  });
  it('should handle login errors', () => {

    service.login('testuser', 'testpassword').subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error.status).toBe(400);
      }
    });
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/token');
    req.flush('Invalid Credentials', { status: 400, statusText: 'Bad Request' });
  });
});