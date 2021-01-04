import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tds-popup-link',
  templateUrl: './popup-link.component.html',
  styleUrls: ['./popup-link.component.scss']
})
export class PopupLinkComponent implements OnInit {
  @Input()
  public link: string;
  @Input()
  public text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
