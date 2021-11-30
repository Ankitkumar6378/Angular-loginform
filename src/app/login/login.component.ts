import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

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
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    })
  }
  get email()
  {
   return this. loginForm.get('email')
  }
  get password()
  {
   return this.loginForm.get('password')
  }
  login(){
    this.http.get<any>("http://192.168.1.140:3000/students").subscribe((result)=>{
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
