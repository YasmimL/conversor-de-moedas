import { Injectable } from '@angular/core';

interface CacheItem<T> {
  value: T;
  expiresAt: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  setItem<T>(key: string, value: T, ttl: number): CacheItem<T> {
    const now = new Date();
    const item: CacheItem<T> = {
      value,
      expiresAt: now.getTime() + ttl,
      createdAt: now,
    };

    localStorage.setItem(key, JSON.stringify(item));

    return item;
  }

  getFullItem<T>(key: string): CacheItem<T> | null {
    const cachedItem = localStorage.getItem(key);

    if (!cachedItem) return null;

    const item: CacheItem<T> = JSON.parse(cachedItem);
    const now = new Date();

    if (now.getTime() > item.expiresAt) {
      localStorage.removeItem(key);

      return null;
    }

    return item;
  }

  getItem<T>(key: string): T | null {
    const item = this.getFullItem<T>(key);

    return item?.value ?? null;
  }
}
