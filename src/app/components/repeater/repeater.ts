import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-repeater',
  standalone:true,
  imports: [CommonModule ],
  templateUrl: './repeater.html',
  styleUrl: './repeater.css'
})
export class Repeater {
@Input() option: any[] = [];
@ContentChild(TemplateRef) template!: TemplateRef<any>;
}
