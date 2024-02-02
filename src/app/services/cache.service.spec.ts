import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let _localStorage: { [key: string]: any } = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  beforeEach(() => {
    _localStorage = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in _localStorage ? _localStorage[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (_localStorage[key] = `${value}`)
    );
    spyOn(window.localStorage, 'clear').and.callFake(
      () => (_localStorage = {})
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cache', () => {
    const cached = service.setItem('password', 'abc123', 500);

    expect(cached).toBeTruthy();
    expect(window.localStorage.setItem).toHaveBeenCalled();
    expect(Object.keys(_localStorage).length).toBe(1);
    expect(Object.keys(_localStorage)).toContain('password');
  });

  it('should get item from cache', () => {
    service.setItem('password', 'abc123', 500);
    const cached = service.getItem<string>('password');

    expect(cached).toBeTruthy();
    expect(window.localStorage.getItem).toHaveBeenCalled();
    expect(cached).toBe('abc123');
  });

  it('should add expiry time according to given time to live', () => {
    const ttl = 1000;
    const cached = service.setItem('password', 'abc123', ttl);

    expect(cached.expiresAt).toEqual(cached.createdAt.getTime() + ttl);
  });

  it('should evict item when it expires', () => {
    const ttl = -1000;
    service.setItem('password', 'abc123', ttl);
    const cached = service.getItem<string>('password');

    expect(cached).toBeNull();
  });
});
