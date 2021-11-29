import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/users").subscribe((result)=>{
      const user=result.find((a:any)=>
      {
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })
      if(user){
        alert("login successfully  !!");
        this.loginForm.reset();
        sessionStorage.setItem('loggedUser', user.email);

        this.router.navigate(['home'])
      }
      else{
        alert("user not Found")
      }

    },err=>{
      alert("somthing wrong")
    }
    )
  }

}
