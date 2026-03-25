import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {

  }

  doSearch(searchTerm: string) {
    this.router.navigateByUrl(`/search/${searchTerm}`);
  }
}
