import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a value', () => {
    service.set('foo', 123);
    expect(service.get<number>('foo')).toBe(123);
  });

  it('should return true for existing key using has()', () => {
    service.set('bar', 'baz');
    expect(service.has('bar')).toBeTrue();
  });

  it('should return false for missing key using has()', () => {
    expect(service.has('missing')).toBeFalse();
  });

  it('should delete a key', () => {
    service.set('toDelete', 'value');
    service.delete('toDelete');
    expect(service.has('toDelete')).toBeFalse();
    expect(service.get('toDelete')).toBeUndefined();
  });

  it('should clear all keys', () => {
    service.set('key1', 'A');
    service.set('key2', 'B');
    service.clear();
    expect(service.has('key1')).toBeFalse();
    expect(service.has('key2')).toBeFalse();
  });
});
