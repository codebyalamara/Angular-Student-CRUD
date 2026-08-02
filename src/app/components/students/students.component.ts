import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Istd } from '../../model/students';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  stdArr : Istd[] = [
    {
      fname: "Jhon",
      lname: "Doe",
      email: "jhon@gmail.com",
      contact: 1234567890,
      stdId: "123"
    },
    {
      fname: "May",
      lname: "Doe",
      email: "May@gmail.com",
      contact: 1234567890,
      stdId: "124"
    },
   {
      fname: "June",
      lname: "Doe",
      email: "June@gmail.com",
      contact: 1234567890,
      stdId: "125"
  },
  {
    fname: "David",
    lname: "Smith",
    email: "david@gmail.com",
    contact: 9876543210,
    stdId: "126"
  },
  {
    fname: "Emma",
    lname: "Wilson",
    email: "emma@gmail.com",
    contact: 9988776655,
    stdId: "127"
  }
  ];

  isInEditMode: boolean = false;
  editStdId: string = '';
  @ViewChild('fname') firstName!: ElementRef;
  @ViewChild('lname') lastName!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;
  
  constructor(
    private _snackbar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  trackStudent(index: number, std: Istd) {
    return std.stdId;
  }

  onAdd() {

// Validation for empty fields
    if (
      this.firstName.nativeElement.value.trim().length === 0 ||
      this.lastName.nativeElement.value.trim().length === 0 ||
      this.email.nativeElement.value.trim().length === 0 ||
      this.contact.nativeElement.value.trim().length === 0) {

      this._snackbar.snackBar('All Fields Are Required !!!')
    
      return;
    }

  // Validation for email format
    let email = this.email.nativeElement.value.trim();
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this._snackbar.snackBar('Please Enter Valid Email Address !!!')
    return;
  }

  // Validation for contact number format
  let contact = this.contact.nativeElement.value.trim();
  let contactRegex = /^[0-9]{10}$/;
  if (!contactRegex.test(contact)) {
  this._snackbar.snackBar('Please Enter Valid 10 Digit Contact Number !!!')
  return;
}

    if (
      this.firstName.nativeElement.value &&
      this.lastName.nativeElement.value &&
      this.email.nativeElement.value &&
      this.contact.nativeElement.value){

      let STD_OBJ: Istd = {
        fname: this.firstName.nativeElement.value,
        lname: this.lastName.nativeElement.value,
        email: this.email.nativeElement.value,
        contact: this.contact.nativeElement.value,
        stdId: Date.now().toString()
      };

      this.stdArr.unshift(STD_OBJ);
      this.firstName.nativeElement.value = '';
      this.lastName.nativeElement.value = '';
      this.email.nativeElement.value = '';
      this.contact.nativeElement.value = '';
      this._snackbar.snackBar(`The student with ID ${STD_OBJ.stdId} has been added successfully!`)

    }
  }

  
  
    onEdit(std: Istd) {
      this.isInEditMode = true;
      this.firstName.nativeElement.value = std.fname;
      this.lastName.nativeElement.value = std.lname;
      this.email.nativeElement.value = std.email;
      this.contact.nativeElement.value = std.contact;
      this.editStdId = std.stdId;

  }

    onUpdate() {
      if (
      this.firstName.nativeElement.value &&
      this.lastName.nativeElement.value &&
      this.email.nativeElement.value &&
      this.contact.nativeElement.value){
        let UPDATE_ID = this.editStdId;
        let UPDATED_STD_OBJ: Istd = {
          fname: this.firstName.nativeElement.value,
          lname: this.lastName.nativeElement.value,
          email: this.email.nativeElement.value,
          contact: this.contact.nativeElement.value,
          stdId: UPDATE_ID
        };

        this.firstName.nativeElement.value = '';
        this.lastName.nativeElement.value = '';
        this.email.nativeElement.value = '';
        this.contact.nativeElement.value = '';

        let getIndex = this.stdArr.findIndex((std) => std.stdId === this.editStdId);
        this.stdArr[getIndex] = UPDATED_STD_OBJ;
        this.isInEditMode = false;

        this._snackbar.snackBar(`The student ${UPDATED_STD_OBJ.fname} ${UPDATED_STD_OBJ.lname} has been updated successfully!`);

      }
    }

    onRemove(stdId: string) {
      let getConfirmation = confirm('Are you sure you want to delete this student?');

      if (getConfirmation) {
        let getIndex = this.stdArr.findIndex(std => std.stdId === stdId);
        this.stdArr.splice(getIndex, 1);
        this._snackbar.snackBar('The student has been removed successfully!');
      }
    }

}
