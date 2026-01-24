import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IntroGuard } from './intro.guard';
import { StorageService } from '../services/storage-service';

describe('IntroGuard', () => {
  let guard: IntroGuard;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
   
    const storageSpy = jasmine.createSpyObj('StorageService', ['get']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        IntroGuard,
        { provide: StorageService, useValue: storageSpy },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(IntroGuard);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if intro_visto is true', async () => {
   
    storageServiceSpy.get.and.returnValue(Promise.resolve(true));

    const result = await guard.canActivate();
    
    expect(result).toBe(true);
  });

  it('should redirect to /intro if intro_visto is false', async () => {
    
    storageServiceSpy.get.and.returnValue(Promise.resolve(false));

    const result = await guard.canActivate();
    
    expect(result).toBe(false);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/intro');
  });
});