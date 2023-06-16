import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { take, first, Observable, map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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

 ruolo: any;

 totRicette: Recipe[];


 recipes$: Observable<Recipe[]> = this.recipeService.getRecipesAsync().pipe(
  map(response => response.filter(ricettaFiltrata => ricettaFiltrata.difficulty < 5)),
  map (res => this.totRicette = res)
  );


 constructor(private recipeService: RecipeService, private userService: UserService, private sanitizer: DomSanitizer){}


 ngOnInit(): void {
  // if(JSON.parse(localStorage.getItem('user')) !== null){
  //   this.userService.userRole.subscribe({
  //     next: res => this.ruolo = res
  //   })
  // }
  this.userService.userRole.subscribe({
    next: res => this.ruolo = res
  });

  this.recipeService.getRecipes().pipe(
    map(response => response.filter(ricettaFiltrata => ricettaFiltrata.difficulty < 3)),
    map (res => this.totRicette = res),
    //unsubscribe
    first()
  ).subscribe({
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

  //  // Sanitizzazione del contenuto HTML
  //  getSanitizedHTML(html: string): string {
  //   const sanitizedHTML = this.sanitizer.bypassSecurityTrustHtml(html);
  //    const slicedHTML = this.accorciaDescrizioneNuova(sanitizedHTML.toString());
  //   return this.sanitizer.bypassSecurityTrustHtml(slicedHTML) as string;
  // }

  // accorciaDescrizioneNuova(descrizione):string {
  //   const lunghezzaMassima = 198;
  //   if(descrizione.length <= lunghezzaMassima){
  //     return descrizione.slice(0, 198);
  //   } else {
  //     let ultimaPosizioneSpazio = descrizione.indexOf(' ', lunghezzaMassima);
  //     return descrizione.slice(0, ultimaPosizioneSpazio);
  //   }
  //  }


     // Sanitizzazione del contenuto HTML
  getSanitizedHTML(descrizione: string): SafeHtml {
    const tagliaDescrizione = this.accorciaDescrizioneNuova(descrizione);
    const sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(tagliaDescrizione);
    return sanitizedDescription;
  }

  // Funzione per accorciare la descrizione
  accorciaDescrizioneNuova(descrizione: string): string {
    const lunghezzaMassima = 198;
    if (descrizione.length <= lunghezzaMassima) {
      return descrizione.slice(0, lunghezzaMassima);
    } else {
      const ultimaPosizioneSpazio = descrizione.lastIndexOf(' ', lunghezzaMassima);
      return descrizione.slice(0, ultimaPosizioneSpazio);
    }
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
