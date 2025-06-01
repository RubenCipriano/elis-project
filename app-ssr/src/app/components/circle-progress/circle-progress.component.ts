
import { Component, Input } from '@angular/core';

@Component({
  selector: 'circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
  standalone: false
})
export class CircleProgressComponent {
    @Input() progressData: { percentage: number; color: string; data: string }[] = [];
    @Input() centerText: string | null = null;
    
    radius = 50; // Radius of the donut ring
    strokeWidth = 15; // Thickness of the ring
    circumference = 2 * Math.PI * this.radius; // Total circumference of the circle
    tooltipData: string = ''; // Stores tooltip text
    tooltipX: number = 0; // X position of tooltip
    tooltipY: number = 0; // Y position of tooltip
    showTooltip: boolean = false; // Controls tooltip visibility

    getSegments() {
        let offset = 0; // Initial stroke offset
        return this.progressData.map((segment) => {
        const length = (segment.percentage / 100) * this.circumference;
        const dashArray = `${length} ${this.circumference - length}`;
        const segmentData = { ...segment, offset, dashArray };
        offset -= length; // Move to next segment
        return segmentData;
        });
    }

    onMouseEnter(event: MouseEvent, data: string) {
        this.tooltipData = data;
        this.tooltipX = event.clientX + 10; // Position tooltip near the cursor
        this.tooltipY = event.clientY + 10;
        this.showTooltip = true;
    }

    onMouseLeave() {
        this.showTooltip = false;
    }
}
