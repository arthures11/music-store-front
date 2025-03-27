import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService, Track } from './track.service';
import { AuthService } from '../auth.service';

describe('TrackService', () => {
    let service: TrackService;
    let httpTestingController: HttpTestingController;
    let mockAuthService: any;

    beforeEach(() => {
        mockAuthService = {
            isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
            getToken: jasmine.createSpy('getToken').and.returnValue('test_token_ABCDEFGHIJKASDASDASD')
        };

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TrackService,
                { provide: AuthService, useValue: mockAuthService }
            ]
        });
        service = TestBed.inject(TrackService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get tracks with authorization header', () => {
        const mockTracks: Track[] = [
            { name: 'Test Track 1', album: 'Test Album 1', artist: 'Test Artist 1', duration: '3:00', genre: 'Test Genre 1' },
            { name: 'Test Track 2', album: 'Test Album 2', artist: 'Test Artist 2', duration: '4:00', genre: 'Test Genre 2' }
        ];

        service.getTracks().subscribe(tracks => {
            expect(tracks).toEqual(mockTracks);
        });

        const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/tracks');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer test_token_ABCDEFGHIJKASDASDASD');
        req.flush(mockTracks);
    });

    it('should get tracks with search term and authorization header', () => {
        const mockTracks: Track[] = [{ name: 'Search Result', album: 'Test Album', artist: 'Test Artist', duration: '2:30', genre: 'Test Genre' }];

        service.getTracks('search').subscribe(tracks => {
            expect(tracks).toEqual(mockTracks);
        });

        const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/tracks?name=search');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe('Bearer test_token_ABCDEFGHIJKASDASDASD');
        req.flush(mockTracks);
    });

    it('should handle HTTP errors', () => {
        service.getTracks().subscribe({
            next: () => fail('should have failed with an error'),
            error: (error) => {
                expect(error.message).toContain('Error Code: 404');
            }
        });

        const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/tracks');
        req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should get tracks without authorization header if not authenticated', () => {
        mockAuthService.isAuthenticated.and.returnValue(false);
        const mockTracks: Track[] = [];

        service.getTracks().subscribe(tracks => {
            expect(tracks).toEqual(mockTracks);
        });

        const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/tracks');
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBeNull();
        req.flush(mockTracks);
    });
});