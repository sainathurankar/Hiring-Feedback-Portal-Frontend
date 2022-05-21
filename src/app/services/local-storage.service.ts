import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public saveData(key: string, data: any): void {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any| null{
    const data = window.localStorage.getItem(key);
    if(data)
      return JSON.parse(data);
    return null;
  }

  public clear(): void{
    window.localStorage.clear();
  }
}
