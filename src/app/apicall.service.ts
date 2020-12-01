import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }

  getWikiSearch(query) {
    return this.http.get(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=${query}`);
  }

  getHackerNews(query) {
    return this.http.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
  }

  getAuthSubmissionCount(query) {
    return this.http.get(`https://hn.algolia.com/api/v1/users/${query}`);
  }
}


