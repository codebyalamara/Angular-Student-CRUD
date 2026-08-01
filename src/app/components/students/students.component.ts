import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Istd } from '../../model/students';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('fname') firstName!: ElementRef;
  @ViewChild('lname') lastName!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;

  constructor(
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onAdd() {

    if (
      this.firstName.nativeElement.value &&
      this.lastName.nativeElement.value &&
      this.email.nativeElement.value &&
      this.contact.nativeElement.value
    ){


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
      this._snackbar.open(`The student ${STD_OBJ.fname} ${STD_OBJ.lname} has been added successfully!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'

      })

    }
  }

  
  
    onEdit(std: Istd) {

  }

    onUpdate() {

  }
 
    onRemove(stdId: string) {

  }

  
}
