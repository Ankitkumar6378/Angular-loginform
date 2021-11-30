import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpage!:FormGroup;
  

  constructor(private formbuilder:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    this.forgetpage=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]

    })
  }
  get email()
  {
   return this.forgetpage.get('email')
  }
  get password()
  {
   return this.forgetpage.get('password')
  }
  forget(){
    this.http.post<any>("http://192.168.1.116:3000/",this.forgetpage.value).subscribe((result)=>{
      
      this.forgetpage.reset();
      //  this.router.navigate(['login'])
    },err=>{
      alert("somthing wrong")
    })
  }

}
