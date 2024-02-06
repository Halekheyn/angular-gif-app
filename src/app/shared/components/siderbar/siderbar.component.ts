import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css',
})
export class SiderbarComponent{

    constructor(private gifsService: GifsService){}

    get tags():string[] {
      return this.gifsService.tagsHistory;
    }

    searchTag( tag:string ):void {
      this.gifsService.searchTag(tag);
    }
 }
