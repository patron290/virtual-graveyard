import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-person-dialog',
    templateUrl: './add-person-dialog.component.html',
    styleUrl: './add-person-dialog.component.scss',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPersonDialogComponent {
    name = signal('');
    description = signal('');
    voiceFileName = signal<string | null>(null);
    imageFileName = signal<string | null>(null);

    constructor(private dialogRef: MatDialogRef<AddPersonDialogComponent>) { }

    onVoiceFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.voiceFileName.set(file.name);
        }
    }

    onImageFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.imageFileName.set(file.name);
        }
    }

    save() {
        // Logic to save would go here
        this.dialogRef.close({
            name: this.name(),
            description: this.description(),
            voiceFile: this.voiceFileName(),
            imageFile: this.imageFileName()
        });
    }

    close() {
        this.dialogRef.close();
    }
}
