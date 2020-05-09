import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: false }) containerElementRef: ElementRef;

  get container() {
    return this.containerElementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    // Disables the built-in context menu
    mxEvent.disableContextMenu(this.container);
    // Creates the graph inside the given container
    const graph = new mxGraph(this.container);
    // Enables rubberband selection
    new mxRubberband(graph);
    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();
    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
      const v1 = graph.insertVertex(parent, null, 'Hello,', 20, 150, 80, 30);
      const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
      const e1 = graph.insertEdge(parent, null, '', v1, v2);
    }
    finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  }
}
