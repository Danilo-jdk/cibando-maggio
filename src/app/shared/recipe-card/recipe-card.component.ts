import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  recipes: Recipe[];
 @Output() messaggio = new EventEmitter();
  @Input() pag;

 page = 1;
 ricettePerPagina = 4;
 totaleRicette: number;

 constructor(private recipeService: RecipeService){}

 ngOnInit(): void {
  this.recipeService.getRecipes().subscribe({
    // il next verrà usato se la chiamata andrà a buon fine
    next: (res) => {
      this.recipes = res;
      this.totaleRicette = res.length;
    },
    error: (err) => {
      // stampo nella console l'errore che restituisce il server
      console.log(err);
    }
  })
}

 inviaTitolo(titolo: string, diff: number, pubblicato: boolean){

  const valoriDaInviare = {
    titolo: titolo,
    diff: diff,
    pubblicato: pubblicato
  }

  this.messaggio.emit(valoriDaInviare);
 }

 accorciaDescrizione(descrizione):number {
  const lunghezzaMassima = 198;
  if(descrizione.length <= lunghezzaMassima){
    return lunghezzaMassima;
  } else {
    let ultimaPosizioneSpazio = descrizione.indexOf(' ', lunghezzaMassima);
    return ultimaPosizioneSpazio;
  }
 }

 paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
 }
}
