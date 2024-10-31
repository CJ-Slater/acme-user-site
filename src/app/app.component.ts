import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Forklift } from '../models/forklift.model';
import { ForkliftService } from './forklift.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ObstacleService } from './obstacle.service';
import { Direction } from '../enums/Direction.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterContentInit {
  title = 'acme-techtest';
  forklifts: Forklift[] = [];
  errorMessage = '';
  obstacles: any;
  movementResults: string[] = [];
  movementCommands: { [forkliftName: string]: string } = {};
  daysSinceAccident = 1;
  
  constructor(private forkliftService: ForkliftService, private obstacleService: ObstacleService) {}
  
  ngAfterContentInit(): void {
    this.getForkliftList();
    this.getObstacles();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.forkliftService.uploadForkliftFile(file).subscribe({
        next: (data) => {
          this.errorMessage = '';
          this.getForkliftList();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      });
    }
}

getObstacles(){
  this.obstacleService.getObstacles().subscribe({
    next: (data) => {
      this.obstacles = data;
    }});
}

submitMoveCommand(forkliftName: string, commandString: string) {
  this.forkliftService.moveForklift(forkliftName, commandString).subscribe({
    next: (data) => {
      this.movementResults = data.movementResults;
      if (this.movementResults.filter((c) => c.toLowerCase().includes("error")).length > 0) {
        this.daysSinceAccident = 0;
      }
      else{
        //Don't display final position information if collision occurs, as per brief
        // this.movementResults.push(`Final Position: (${data.finalPosition.x}, ${data.finalPosition.y})`);
        // this.movementResults.push(`Facing: ${Direction[data.finalPosition.facing]}`);
      }
    },
    error: (error) => {
      this.errorMessage = error.error.message;
    }
  });
}

deleteForklifts(){
  this.forkliftService.deleteForklifts().subscribe({
    next: () => {
      this.getForkliftList();
    },
    error: (error) => {
      this.errorMessage = error.error.message;
    }
  });
}

getForkliftList() {
   this.forkliftService.getAllForklifts().subscribe({
    next: (data) => {
      this.forklifts = data;
      this.errorMessage = '';
    },
    error: (error) => {
      this.errorMessage = error.error.message;
    }
  });
}
}
