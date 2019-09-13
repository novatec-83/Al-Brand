import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-getpayment',
    templateUrl: './getpayment.component.html',
    styleUrls: ['./getpayment.component.scss']
})
export class GetpaymentComponent implements OnInit {
    flipclass = 'credit-card-box';
    model: any={};
    userEmail:any;
    getprice:any=[];
    cardholder;
    email;
    cardmask = [/[0123456789]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public mask=function(rawValue) {

        // add logic to generate your mask array
        if (rawValue && rawValue.length > 0) {
            if (rawValue[0] == '0' || rawValue[5] == '1') {
                return [/[01]/, /[1-9]/, '/', /[2-9]/, /[0-9]/, /[0-9]/, /[0123456789]/];
            } else {
                return [/[01]/, /[0-2]/, '/',  /[2-9]/, /[0-9]/, /[0-9]/, /[0123456789]/];
            }
        }
        return [/[01]/, /[0-9]/, '/',  /[2-9]/, /[0-9]/, /[0-9]/, /[0123456789]/];

    }
    packge;
    amount;
    priceArray=[];
    monthlyPrice=false;
    cardexpiration;
    cardcode;
    cardnumber;
    categories;
    form = new FormGroup({
        cardnumber: new FormControl('', [
            Validators.required,
        ]),
        cardnickname: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.required,
            // noSpaceValidator.cannotContainSpace,
            Validators.pattern('^[a-zA-Z _.]+$')
        ]),
        ccv: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.pattern('^[0-9]*$')
        ]),
        expirydate: new FormControl('', [
            Validators.required,
            Validators.pattern('(0[1-9]|10|11|12)/20[0-9]{2}$')
        ]),

    });
    userFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z _.]+$')
    ]);
    age = [
        {show: 'Monthly', code: 's'},
            {show: 'Yearly', code: 'm'}
            ];
    monthArray=[5,59,119];
    yearArray=[399, 699, 1399];
    catagories=['Starter','Business','Agency'];

private popus: number=0;
        constructor(private authService:AuthenticationService, private  router:Router){}
    ngOnInit(){
       this.userEmail= localStorage.getItem('newUSerEmail');

    }
    onSelect(event) {
            console.log(event.value);
            if(event.value ==='Yearly'){
                this.priceArray=[];
                for(let item of this.yearArray)
                {
                    this.priceArray.push(item);

                }
                console.log('Yearly price is',this.priceArray);
            }
            else if(event.value ==='Monthly') {
                    this.priceArray=[];
                for(let item of this.monthArray)
                {
                    this.priceArray.push(item);
                }
                console.log('Monthly price is',this.priceArray);
            }

    }


    getPaid() {
            this.authService.get_Payment(
                this.model.cardholder,
                this.userEmail,
                this.model.show,
                this.model.amount,
                this.model.cardexpiration,
                this.model.cardcode,
                this.model.cardnumber,
                this.model.categories)
                .subscribe(
                    data => {
                         this.model.email=this.userEmail;

                        Swal.fire('Your account has been Registered,', 'Your Account will expire in 7 days', 'success');
                    },
                    error => {
                        Swal.fire('Account Not Register', 'Some Server Side Error', 'error');
                    });
        }

}
