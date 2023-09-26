import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private _data: Category[] = [
    new Category("sport", ["basket", "foot", "rugby"]),
    new Category("social", ["bénévolat", "manifestation"]),
    new Category("théâtre", []),
    new Category("exposition", []),
    new Category("cinéma", []),
    new Category("musique", ["hip-hop", "jazz", "rock"]),
    new Category("jeux", ["jeux de rôle", "jeux de société", "jeux vidéos"]),
    new Category("livre", ["bd", "manga", "roman"]),
    new Category("science", ["écologie", "santé", "technologie"])
  ];

  getAll(): Category[] {
    return this._data;
  }
}
