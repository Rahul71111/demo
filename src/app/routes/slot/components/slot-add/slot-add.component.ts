import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slot-components-slot-add",
  templateUrl: "./slot-add.component.html",
  styleUrls: ["./slot-add.component.scss"],
})
export class SlotComponentsSlotAddComponent implements OnInit {
  days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  depoList: any[] = [
    { name: "Indore", id: "sdfdfsdf" },
    { name: "Bhopal", id: "sdfdfsdf" },
    { name: "Gwalior", id: "sdfdfsdf" },
    { name: "Ujjain", id: "sdfdfsdf" },
    { name: "Rewa", id: "sdfdfsdf" },
  ];

  isChecked:boolean = true;
  
  constructor() {}

  ngOnInit() {}
}
