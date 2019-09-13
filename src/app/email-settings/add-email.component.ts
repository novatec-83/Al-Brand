import {Component, Inject, Input} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styles: []
})
export class AddEmailComponent {

    comm_email: string;
    // @Input() list_id:any;
    name: string;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);
    constructor(public dialog: MdDialog) {}

    openDialog(): void {
        let dialogRef = this.dialog.open(AddEmailDialog, {
            width: '450px',
            data: { name: this.name, comm_email: this.comm_email, emailFormControl:this.emailFormControl }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.comm_email = result;
           if(result) {
               window.location.href =
                   // 'https://accounts.google.com/o/oauth2/auth?client_id=239235840914-cre9qjca03jvsm4v5hv89kh8r42k22mj.apps.googleusercontent.com&redirect_uri=https://influexpapi.herokuapp.com/email/settings&scope=https://www.googleapis.com/auth/gmail.modify+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&approval_prompt=force&user_id='+result+'&state=';
                   'https://accounts.google.com/o/oauth2/auth?client_id=995292426967-u3hapvb4pk7ouj01k1pkqtqgdgrg2na8.apps.googleusercontent.com&redirect_uri=https://brand.influexpai.com/email/settings&scope=https://www.googleapis.com/auth/gmail.modify+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&approval_prompt=force&user_id='+result+'&state=';
                   // 'https://accounts.google.com/o/oauth2/auth?client_id=239235840914-cre9qjca03jvsm4v5hv89kh8r42k22mj.apps.googleusercontent.com&redirect_uri=https://www.influexp.com/email/settings&scope=https://www.googleapis.com/auth/gmail.modify+https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&approval_prompt=force&user_id='+result+'&state=';

           }
        });
    }

}




@Component({
    selector: 'add-email-dialog',
    templateUrl: 'add-email-dialog.html',
})
export class AddEmailDialog {

    constructor(
        public dialogRef: MdDialogRef<AddEmailDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
