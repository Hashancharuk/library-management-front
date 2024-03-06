import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";

@Component({
    selector: 'app-view-all-users',
    standalone: true,
    templateUrl: './view-all-users.component.html',
    styleUrl: './view-all-users.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
})
export class ViewAllUsersComponent implements OnInit {

  public userList:any;
  private baseURL:String = "http://localhost:8081";

  public selectedUser:any={
    "id":null,
    "firstName":null,
    "lastName":null,
    "userName":null,
    "email":null,
    "address":null,
    "address2":null,
    "country":null,
    "phoneNumber":null
  }

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this.http.get(this.baseURL+"/user/get-all-users").subscribe((res:any)=>{
      console.log(res);
      this.userList=res;
    })
  }
  deleteUser(){
    this.http.delete(this.baseURL+"/user/delete/"+this.selectedUser.id,{responseType:'text'}).subscribe((res:String)=>{   
      this.loadUsers();
      Swal.fire({
        title:"Deleted",
        text:`You Deleted${this.selectedUser.userName} success`,
        icon: "success" 
      })
    })
  }
  setSelectedUser(user:any){
    this.selectedUser=user;
  }
  saveUser(){
    this.http.post(this.baseURL+"/user/addUser",this.selectedUser).subscribe((res:any)=>{
      this.loadUsers();
      Swal.fire({
        title:"Updated !",
        text:`You Updated ${this.selectedUser.userName} success`,
        icon: "success" 
      })
    })
  }
}
