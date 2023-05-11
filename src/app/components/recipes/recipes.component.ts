import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  // creo una var che mi conterrà le ricette della chiamata
  ricette: Recipe[];

  constructor(private recipeService: RecipeService ){}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      // il next verrà usato se la chiamata andrà a buon fine
      next: (res) => {
        this.ricette = res;
      },
      error: (err) => {
        // stampo nella console l'errore che restituisce il server
        console.log(err);
      }
    })
  }
}
