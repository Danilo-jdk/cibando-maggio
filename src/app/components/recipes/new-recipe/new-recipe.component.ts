import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent {

  editor = ClassicEditor;

  editorConfig = {
    toolbar: {
        items: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'codeBlock',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
};

  formNewRecipe = new FormGroup({
    titolo: new FormControl('', Validators.required),
    descrizione: new FormControl('', Validators.required),
    immagine: new FormControl('', Validators.required)
  });

  constructor(private recipeService: RecipeService, private router: Router){}

  onSubmit(){
    console.log(this.formNewRecipe.value)

    const ricetta = {
      title: this.formNewRecipe.value.titolo,
      description: this.formNewRecipe.value.descrizione,
      image: this.formNewRecipe.value.immagine,
      difficulty: 3
    }
    this.recipeService.createRecipe(ricetta).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['home']);
      },
      error: (err) => console.log(err)
    })
  }

}
