import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-components-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductsComponentsProductAddComponent implements OnInit {

  categoryList = []
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['',[Validators.required]],
      thumbnail: ['',[Validators.required]],
      product_img: ['',[Validators.required]],
      description: ['',[Validators.required]],
      recommendation: [''],
      recipe:[''],
    });
   }

  ngOnInit() {
  }

  thumpnailUpladChange(event){
    let files:File[] = event.target.files;
    if(files && files != null && files.length > 0){
      let singleFile = files[0];
      this.productForm.get('thumbnail').setValue(singleFile.name);
    }else{
      this.productForm.get('thumbnail').reset();
    }

  }

  productImageUpladChange(event){
    let files:File[] = event.target.files;
    if(files && files != null && files.length > 0){
      let singleFile = files[0];
      this.productForm.get('product_img').setValue(singleFile.name);
    }else{
      this.productForm.get('product_img').reset();
    }
  }

  recipeUpladChange(event){
    let files:File[] = event.target.files;
    if(files && files != null && files.length > 0){
      let singleFile = files[0];
      this.productForm.get('recipe').setValue(singleFile.name);
    }else{
      this.productForm.get('recipe').reset();
    }

  }

}
