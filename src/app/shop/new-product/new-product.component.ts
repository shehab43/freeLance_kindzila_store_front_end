import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../shop.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  inputs: { value: string }[] = [];

  newFormTask!: FormGroup
  filename = ""
  constructor(private fb: FormBuilder, private shopServices: ShopService) {

  }
  ngOnInit(): void {
    this.Createform();
  }
  addInput() {
    this.inputs.push({ value: '' });
  }

  Createform() {
    this.newFormTask = this.fb.group({
      Name: ['', Validators.required],
      Sku: ['', Validators.required],
      poster: ['', Validators.required],
      productType :this.fb.array([
        
    
        
      ]),
      PrandName: ['', Validators.required],
      
    })
  }
  get productTypes(): FormArray {
    return this.newFormTask.get('productType') as FormArray;
  }
  public addProductType(): void {
    const productTypesArray = this.newFormTask.get('productType') as FormArray;
    const productTypeGroup = this.fb.group({
      skuType: ['', Validators.required],
      wholesale: ['', Validators.required],
      size: ['', Validators.required],

      HalfSentence: ['', Validators.required],
      retailAccount: ['', Validators.required],  
      cost: ['', Validators.required],
      Quantity: ['', Validators.required],
    });
    productTypesArray.push(productTypeGroup);
  }
  CreateTask() {
    let formData = new FormData()
  //   formData.append("Name",this.newFormTask.value['Name'])
  //   formData.append("Sku",this.newFormTask.value['Sku'])
  //   formData.append("poster",this.newFormTask.value['poster'])
  //  formData.append("skuType",this.newFormTask.value['skuType'])   
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
  //   // // formData.append("",this.newFormTask.value[''])
    let model =  this.preperFormData()
    console.log(this.newFormTask.getRawValue())
        console.log(this.newFormTask.value)

   this.shopServices.createTask(this.newFormTask.value).subscribe(res => {

    }
   
    
    )
  }
  SelectImage(event: any) {
    this.filename = event.target.value
    this.newFormTask.get('poster')?.setValue(event.target.files[0])
    console.log(event)
  }

  preperFormData() {
    let formData = new FormData()
    Object.entries(this.newFormTask.value).forEach(([key, value]: any) => {
      formData.append(key, value)
      console.log(key, value)
    })
    return formData
  }
}


// [{
//   "size": 1,
//   "sku": "ass",
//   "wholesale": 10,
//   "halfSentence": 20,
//   "retailAccount": 30,
//   "cost": 20,
//   "quantity": 10
// },{
//   "size": 0,
//   "sku": "ass",
//   "wholesale": 10,
//   "halfSentence": 20,
//   "retailAccount": 30,
//   "cost": 20,
//   "quantity": 10
// }]
