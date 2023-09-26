import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuizQuestions(category: string): Observable<any> {
    const params = {
      amount: '10',
      category: category,
      type: 'multiple'
    };
    return this.http.get(this.apiUrl, { params });

  }
}
