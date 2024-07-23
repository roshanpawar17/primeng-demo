import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductServiceService } from './services/product-service.service';
import { Product, Representative } from './models/product';
import { CustomerService } from './services/customer.service';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'primeng-demo';
  products: Product[] = [];
  customers = [];
  cols: any[];
  sizes: any[];
  selectedSize: any = '';

  representatives: Representative[];

  statuses: any[];
  layout:string =  'list'

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  items: string[];
  // items: string[][];
  lazyLoading = true;
  loadLazyTimeout: any;

  @ViewChild('dt1') dt: Table;

  constructor(
    private productService: ProductServiceService,
    private customerService: CustomerService,
    private renderer: Renderer2
  ){}

  ngOnInit() {
    this.productService.getProductsMini().then((data: any) => {
        this.products = data;
    });

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'price', header: 'Price' }
    ];

    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
    ];

    console.log("selectedSize ", this.selectedSize)

    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;
      this.customers.forEach((customer) => (customer.date = new Date(customer.date)));
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
        { label: 'Unqualified', value: 'unqualified' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'New', value: 'new' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Renewal', value: 'renewal' },
        { label: 'Proposal', value: 'proposal' }
    ];

    this.setItems();
    // this.getIcons();

  }

  getSeverity(status: string): any {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  customSort(event: SortEvent) {
    console.log(event);
    event.data.sort((data1, data2)=>{
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      console.log("value1 ", value1)
      console.log("value2 ", value2)

      if(typeof value1 === 'string' && typeof value2 === 'string'){
        result = value1.localeCompare(value2);
      }else{
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      console.log("result ", result)
      return event.order * result;
    });

  }

  applyFilterGlobal(event, stringVal){
    this.dt.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }
  
  // eg
  // let array = [3, 1, 4, 1, 5, 9, 2, 6, 5];

  // array.sort((a, b) => {
  //   if (a < b) return -1;  // a comes before b
  //   if (a > b) return 1;   // a comes after b
  //   return 0;              // a and b are equal
  // });
  
  setItems(){
    // this.items = Array.from({length: 100}).map((_, i)=>{
    //   return `item${i+1}`
    // });
    
    // this.items = Array.from({length: 100}).map((_, i)=>Array.from({length:100}).map((_, j)=>`item${j+1} item${i+1}`));
    // console.log(this.items)
  }

  // onLazyLoad(event) {
  //   this.lazyLoading = true;

  //   if (this.loadLazyTimeout) {
  //       clearTimeout(this.loadLazyTimeout);
  //   }

  //   //imitate delay of a backend call
  //   this.loadLazyTimeout = setTimeout(() => {
  //       const { first, last } = event;
  //       const lazyItems = [...this.items];

  //       for (let i = first; i < last; i++) {
  //           lazyItems[i] = `Item #${i}`;
  //       }

  //       this.items = lazyItems;
  //       this.lazyLoading = false;
  //   }, Math.random() * 1000 + 250);
  // }

  // getIcons(){
  //   let icons = document.querySelectorAll('.icon');
  //   icons.forEach((icon)=>{
  //     console.log(icon);
  //     icon.addEventListener('click', ()=>{
  //       console.log("clicked on", icon);
  //       const iconStyles = window.getComputedStyle(icon);
  //       const iconOpacity = iconStyles.opacity
  //       if(iconOpacity === '0'){
  //         this.renderer.setStyle(icon, 'opacity', '1');
  //       }else{
  //         this.renderer.setStyle(icon, 'opacity', '0');
  //       }
  //     });
  //   });
  // }

  data = [
    {
        expanded: true,
        type: 'person',
        data: {
            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
            name: 'Amy Elsner',
            title: 'CEO'
        },
        children: [
            {
                expanded: true,
                type: 'person',
                data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                    name: 'Anna Fali',
                    title: 'CMO'
                },
                children: [
                    {
                        label: 'Sales'
                    },
                    {
                        label: 'Marketing'
                    }
                ]
            },
            {
                expanded: true,
                type: 'person',
                data: {
                    image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                    name: 'Stephen Shaw',
                    title: 'CTO'
                },
                children: [
                    {
                        label: 'Development'
                    },
                    {
                        label: 'UI/UX Design'
                    }
                ]
            }
        ]
    }
  ];

  first: number = 0;

  rows: number = 10;

  first2: number = 0;

  rows2: number = 10;

  first3: number = 0;

  rows3: number = 10;

  totalRecords: number = 120;

  options = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 120, value: 120 }
  ]

  onPageChange(event) {
    console.log(event)
      this.first = event.first;
      this.rows = event.rows;
  }

  onPageChange2(event){
    this.first2 = event.first;
    this.rows2 = event.rows;
  }

  onPageChange3(event){
    console.log(event)
    this.first3 = event.first;
    this.rows3= event.rows;
  }
}
