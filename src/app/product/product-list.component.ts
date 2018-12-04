import { Component } from '@angular/core';
import { IProduct } from './product';

@Component({
  selector: 'pm-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle: String = 'Product list';
  imageWidth: Number = 50;
  imageMargin: Number = 2;
  showImage: Boolean = false;
  fileteredProducts: IProduct[];

  private _listFilter: String = 'cart';
  public get listFilter(): String {
    return this._listFilter;
  }
  public set listFilter(value: String) {
    this._listFilter = value;
    this.fileteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  products: IProduct[] = [
    {
      'productId': 2,
      'productName': 'Garden Cart',
      'productCode': 'GDN-0023',
      'releaseDate': 'March 18, 2016',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'starRating': 4.2,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
    },
    {
      'productId': 5,
      'productName': 'Hammer',
      'productCode': 'TBX-0048',
      'releaseDate': 'May 21, 2016',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'starRating': 4.8,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
    }
  ];

  constructor() {
    this.fileteredProducts = this.products;
    this.listFilter = 'cart';
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
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
