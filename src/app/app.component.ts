import { Component } from '@angular/core';
import { FormGroup , FormBuilder , Validators, FormControlName}  from '@angular/forms';
import {NgToastService} from 'ng-angular-popup'
import {LEVEL} from '../level-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerForm!: FormGroup
  title = 'InputBox Validation';
  submitted = false;
  
  levels= LEVEL;

  levelcode?:string="";



  constructor(private formBuilder:FormBuilder,private toast:NgToastService){}
  ngOnInit() {

    //required field
    //creating object
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword: ['',Validators.required],
      level:['',Validators.required]
    },
    {
      validators:this.MustMatch('password','confirmpassword')
    })
  }
    changeLevel(e:any){
    console.log(e.target.value)
    this.levelcode = e.target.value;
 }

  //Mustmatch fucntion to check if password is same as confirmed Password
  MustMatch(controlName:string ,matchingControlName : string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return 
      }

      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch:true});

      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }

  //on submitting the form this fucntion will check for errors during Validations
    onSubmit()
    {
      this.submitted = true
      if (this.registerForm.invalid){
        return this.toast.error({detail:"STATUS",summary:"Registration Failed",duration:5000});
      }
      //alert("Success")
      this.toast.success({detail:"STATUS",summary:"Registration Successful",duration:5000});
    }
  }

