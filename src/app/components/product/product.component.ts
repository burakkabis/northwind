import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  {

  products: Product[] = [];
  dataLoaded=false;
  filterText="";

  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) {}


//  ngOnInit():void{

//   this.activatedRoute.params.subscribe(params=>{
//     if (params["categoryId"]){
//       this.getProductsByCategory(params["categoryId"])


//     }
//       else
//       {
//         this.getProducts()

//       }
//   })

//  }

//  getProducts(){
//  this.productService.getProducts().subscribe(response=>{
//   this.products=response.data
//   this.dataLoaded=true
//  })

//  }


//  getProductsByCategory(categoryId:number){
//   this.productService.getProductsByCategory(categoryId).subscribe(response=>{
//    this.products=response.data
//    this.dataLoaded=true
//   })
 
//   }
 
// addToCart(product:Product){
//   if(product.productId===1)
//   {
//   this.toastrService.error("Hata","Bu urun sepete eklenemez")
//   }
//   else{
//     this.toastrService.success("Sepete eklendi",product.productName)
//     this.cartService.addToCart(product)
//   }
// }

// }

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    if(params["categoryId"]){
      this.getProductsByCategory(params["categoryId"])
    }
    else{
      this.getProducts()
    }
  
  })
}
getProducts() {
  this.productService.getProducts().subscribe(response=>{
    this.products=response.data
    this.dataLoaded=true;
  })
}
  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products=response.data
      this.dataLoaded=true;
    })
}

addToCart(product:Product){
  this.toastrService.success("Sepete eklendi.",product.productName)
  this.cartService.addToCart(product);
}
}