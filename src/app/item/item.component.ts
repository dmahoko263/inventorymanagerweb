import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

    itemArray : any[] = [];
    isResultLoaded = false;
  
   
    
    iName: string ="";
    iDescription: string ="";
    iQuantity: Number =0;
   
    itemID = "";
  
  
  constructor(private http: HttpClient )
    {
      this.getAllitem();
   
    }
  
    getAllitem()
    {
      
      this.http.get("http://127.0.0.1:8000/api/inventory/search")
    
      .subscribe((resultData: any)=>
      {
          this.isResultLoaded = true;
          console.log(resultData);
          this.itemArray = resultData;
      });
    }
   
    add()
    {
    
      let bodyData = {
        "iName" : this.iName,
        "iDescription" : this.iDescription,
        "iQuantity" : this.iQuantity,
        "itemID":null
      };
   
      this.http.post("http://127.0.0.1:8000/api/inventory/add",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Item added Successfully");
          this.getAllitem();
          this.iName = '';
          this.iDescription = '';
          this.iQuantity  = 0;
      });
    }
    setUpdate(data: any)
    {
     this.iName = data.iName;
     this.iDescription = data.iDescription;
     this.iQuantity = data.iQuantity;
     this.itemID = data.itemID;
    }
   
    UpdateRecords()
    {
      let bodyData = {
        "itemID" : this.itemID,
        "iName" : this.iName,
        "iDescription" : this.iDescription,
        "iQuantity" : this.iQuantity,
    
      };
      
      this.http.put("http://127.0.0.1:8000/api/inventory/update",bodyData).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Item updated ")
          this.getAllitem();
        
      });
    }
   
    save()
    {
      if(this.itemID == '')
      {
          this.add();
      }
        else
        {
         this.UpdateRecords();
        }      
   
    }
   
    setDelete(data: any)
    {
      
      
      this.http.delete("http://127.0.0.1:8000/api/inventory/delete/itemID/"+ data.itemID,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Item deleted")
          this.getAllitem();
          this.iName = '';
          this.iDescription = '';
          this.iQuantity  = 0;
    
      });
   
    }
  
  
  
  }