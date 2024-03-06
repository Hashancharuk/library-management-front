import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  private http;
  public countryList:any;
  public selectedCountry:any;
  public selectedCountryCode:any;
  public isExistsUser:any;

  public userObj={
    firstName:null,
    lastName:null,
    userName:null,
    email:null,
    address:null,
    address2:null,
    country:null,
    phoneNumber:null
  }

  constructor(private httpCliant:HttpClient,public router:Router){
    this.http = httpCliant;
  }

  ngOnInit(): void {
    this.loadCounties();
  }
  loadCounties(){
    let api="https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe(res =>{
      this.countryList=res;
      console.log(res);
    });
  }
  setSelectedCountry(country:any){
    this.setSelectedCountry=country;
    this.selectedCountryCode=country.idd.root+""+country.idd.suffixes[0];
    console.log(this.selectedCountryCode)
  }
  submitForm(){
    console.log(this.userObj);
    this.http.get(`http://localhost:8081/user/isExistsUser/${this.userObj.userName}`).subscribe(data=>{
      console.log(data);
      this.isExistsUser=data;
      this.registerUser(this.isExistsUser);
    })
  }
  registerUser(isExistsUser:any ){
    if(!isExistsUser==true){
        this.http.post("http://localhost:8081/user/addUser",this.userObj).subscribe(data=>{
          Swal.fire({
            title:"Success",
            text:`${this.userObj.userName} has been registerd.!`,
            icon:"success"
          })
          this.router.navigate(['/login'])
        })
    }else{
      Swal.fire({
        title:"Can't Register this User",
        text:`${this.userObj.userName} has already been registerd.!`,
        icon:"error"
      })
    }
    console.log(isExistsUser);
  }
}
