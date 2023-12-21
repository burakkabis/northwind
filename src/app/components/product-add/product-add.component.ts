import { Component } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  productAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private productService:ProductService
    ,private toastrService:ToastrService){}

  ngOnInit():void{
    this.createProductAddForm();
  }


  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
         let productModule= Object.assign({},this.productAddForm.value) 
         this.productService.add(productModule).subscribe(response=>{
         // console.log(removeEventListener)
          this.toastrService.success(response.message,"başarılı")
         },responseError=>{
          if(responseError.error.Errors.lenght>0){
            for (let i =0; i < responseError.error.Errors.lenght;i++ ) {
               this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
            }
          }
         })
         
    }else{
      this.toastrService.error("Formunuz eksik","dikkat")
    }


  }


  
  

}
