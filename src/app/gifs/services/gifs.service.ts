import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gitList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'VRY2pkVrK83Tw5TMiPVEfkSW0XK0ORVs';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void{
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag )
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();

    console.log(this._tagsHistory);
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{

    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string):void{

    if(tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
        .subscribe(resp => {

          this.gitList = resp.data;
          //console.log(this.gitList );
        });


    // De manera directa
    // si se usa fecha el metodo debe ser async y retornar Promise<void>
    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=...')
      .then(resp => resp.json)
      .then(data => console.log(data));*/

    // Otra manera
    /*const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=..');
    const data = await resp.json();
    console.log(data);*/

    // Se puede usar axios que es una alternativa a Angular.
    // Las peticiones fecth no se pueden cancelar, una vez se ejecutan.
  }
}
