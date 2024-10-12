import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model'; 
import { FavoritesService } from '../../services/favorite.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {
  favoriteItems: Product[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.getFavoriteItems().subscribe(
      items => {
        this.favoriteItems = items;
      },
      error => {
        console.error('Error fetching favorite items:', error);
      }
    );
  }
}
