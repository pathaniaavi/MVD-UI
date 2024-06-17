import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Inject } from '@angular/core';
import { TransferService } from '../services/transfer.service';

interface Data {
  companyContext: string;
}

@Component({
  selector: 'app-transfer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.scss'],
})
export class TransferDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransferDialogComponent>,
    private transferService: TransferService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      contractID: ['', Validators.required],
      assetID: ['', Validators.required],
      baseUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.data.companyContext)
    if (this.form.valid) {
      console.log(this.form.value)
      this.transferService
        .createTransferRequest(this.form.value, this.data.companyContext)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.dialogRef.close(res);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
