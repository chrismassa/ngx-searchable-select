# Getting Started

ngx-searchable-select is an Angular library designed to extend the mat-select component of Angular Material and include an embedded search functionality.

# Installation

After creating a new Angular project simply run:

```properties
npm install ngx-searchable-select --save
``` 

# Usage

- Firstly, import NgxSearchableSelectComponent in your app module (or any other proper Angular Module, Standalone Components also work).
  
    ```typescript
    import { NgxSearchableSelectComponent } from 'ngx-searchable-select';

    @NgModule({
        imports: [
            NgxSearchableSelectComponent
        ],
    })
    export class AppModule {}
    ```
- Then use the **ngx-searchable-select** tag in the HTML of your Angular component:
  
  ```html
  <ngx-searchable-select label="User" />
  ```