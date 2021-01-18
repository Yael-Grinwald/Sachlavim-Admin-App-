import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'table-app',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})

export class TableComponent implements OnInit  {

  people = [
    {
      name: 'John',
      id: 1,
      colour: 'Green',
      pet: 'Dog'
    },
    {
      name: 'Sarah',
      id: 2,
      colour: 'Purple',
      pet: 'Cat'
    },
    {
      name: 'Lindsay',
      id: 3,
      colour: 'Blue',
      pet: 'Lizard'
    },
    {  
      name: 'Megan',
      id: 4,
      colour: 'Orange',
      pet: 'Dog'
    }
  ];

  nameFilter = new FormControl('');
  idFilter = new FormControl('');
  colourFilter = new FormControl('');
  petFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'id', 'favouriteColour', 'pet'];
  filterValues = {
    aaa: '',
    id: '',
    colour: '',
    pet: ''
  };

  constructor() {
    this.dataSource.data = this.people;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.aaa = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.colourFilter.valueChanges
      .subscribe(
        colour => {
          this.filterValues.colour = colour;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.petFilter.valueChanges
      .subscribe(
        pet => {
          this.filterValues.pet = pet;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
  }

}
