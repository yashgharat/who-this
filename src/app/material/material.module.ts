import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatNativeDateModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatBadgeModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule],
  exports: [CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule],
})
export class MaterialModule { }
