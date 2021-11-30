import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import{HttpClient} from'@angular/common/http'
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!:FormGroup

  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router) { }
  ngOnInit(): void {
    this.registrationForm=this.formbuilder.group({
    username:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$')]],
    email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
    mobile:['',[Validators.required, Validators.pattern('')]],
    password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]]
    })
  }
  get username()
  {
   return this.registrationForm.get('username')
  }
  get email()
  {
   return this.registrationForm.get('email')
  }
  get mobile()
  {
   return this.registrationForm.get('mobile')
  }
  get password()
  {
   return this.registrationForm.get('password')
  }
  submit(){
    this.http.post<any>("http://192.168.1.116:3000/register",this.registrationForm.value).subscribe((result)=>{
      alert("Registration Successfull !!!");
      this.registrationForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("somthing wrong")
    })
  }
}
