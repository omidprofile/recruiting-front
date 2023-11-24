import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatListModule } from "@angular/material/list";
import { MatLegacyListModule } from "@angular/material/legacy-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	exports: [
		MatSidenavModule,
		NgIf,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatTooltipModule,
		MatListModule,
		MatMenuModule,
		MatCardModule,
		MatSelectModule,
		MatChipsModule,
		MatInputModule,
		MatProgressBarModule,
		MatTableModule,
		MatDialogModule,
		MatSnackBarModule,
		MatTabsModule,
    MatCheckboxModule

	]
})
export class MaterialModule {
}
