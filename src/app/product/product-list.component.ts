import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product list';
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: Boolean = false;
  fileteredProducts: IProduct[];
  errorMessage: string;

  private _listFilter;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.fileteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  products: IProduct[];

  constructor(private productService: ProductService) {

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(
      (products) => {
        this.products = products;
        this.fileteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product) => {
      return (product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    });
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List : ' + message;
  }
}
