import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
  id: string;
  startTime: string;
  endTime: string;
  day: string;
  depo: string;
  active: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    startTime: "Time",
    endTime: "Time",
    day: "Monday",
    depo: "Indore",
    active: true,
    id: "sdfsd",
  },
];

@Component({
  selector: "app-slot-components-slot-list",
  templateUrl: "./slot-list.component.html",
  styleUrls: ["./slot-list.component.scss"],
})
export class SlotComponentsSlotListComponent implements OnInit {
  navs: string[] = ["Home", ""];

  displayedColumns: string[] = [
    "startTime",
    "endTime",
    "day",
    "depo",
    "active",
    "controls",
  ];

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

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}
}
