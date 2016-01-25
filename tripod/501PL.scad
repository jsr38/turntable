// A replacement plate for Manfrotto 501PL quick release compatible heads
// by Nirav Patel <http://eclecti.cc>
//
// Altered to suit Velbon Sherpa 250 with PH-157Q
// JSR 2016 

// Available under the CC BY license

channel = 5.5;              // Width of the channel in the middle
height = 8.5;               // Height of the plate (>=11 mm recommended)
length = 19.0 * 2.0 + 3.0; // Length of the plate (90 mm is the stock one)
wall = 3;                   // Thickness of walls
width = 36.0;              // Width of the main cube structure
channel_offset = width / 2.0;

tan_theta = 2.625 / length;

module tapered() polyhedron(points = [[-2.625,0,0], [0,wall,height], [0,0,0], [0,length,0], [0,length - wall,height], [0,length,0]],
        faces = [[0,1,2], [0,4,1], [0,3,4], [0,5,3], [0,2,5], [3,5,4], [2,1,4], [2,4,5]]);
        
module tapered_back() polyhedron(points = [[-2.625 +wall * tan_theta,wall,0], [0,wall,height], [-2.625,0,0], [width + 2.625,0,0], [width,wall,height], [width + 2.625 - wall * tan_theta,wall,0]],
        faces = [[0,1,2], [0,4,1], [0,5,4], [0,3,5], [0,2,3], [3,4,5], [2,1,4], [2,4,3]]);

module tapered_front() polyhedron(points = [[0,length - wall,0], [0,length,0], [0,length - wall,height], [width,length,0], [width,length - wall,height], [width,length - wall,0]],
        faces = [[0,1,2], [0,2,4], [0,4,5], [0,5,1], [1,5,3], [3,5,4], [1,4,2], [1,3,4]]);    

rotate([180,0,0]) // flipped for printability
difference() {
    union() {
        difference() {
            translate([0, wall, 0]) cube([width,length - 2.0 * wall,height]); // the bulk of the box
            translate([wall,wall,0]) cube([width- 2.0 *wall,length - 2 * wall,3.9]);      // removes the base area
            // hollow out what we can to make it use less plastic
            //translate([wall,wall,0]) cube([42/2-2*wall-8,length-2*wall, height-wall]);
            //translate([wall+42/2+8,wall,0]) cube([42/2-2*wall-8,length-2*wall, height-wall]);
        }
        // the tapered side bits
        tapered();
        translate([width,0,0]) mirror([1,0,0]) tapered();
        tapered_back();
        tapered_front();
        // the stop to keep it from falling out the front
        //%translate([0,width,0]) cube([11,4,height]);
        //%translate([0,wall,0]) cube([width - 5.0,wall,height]);
        // the triangle piece that the quickrelease interfaces with
        //polyhedron(points = [[width,width,0], [width,0,0], [width - 5.0,width,0], [width, width, height], [width, 0, height], [width - 5.0, width, height]],
        //    faces = [[0,2,1],[0,1,3],[1,4,3],[2,4,1],[2,5,4],[0,3,5],[0,5,2],[5,3,4]]);
    }

    // the channel for the camera mount screw
    translate([channel_offset,15,0]) cylinder(h=height,r=channel/2);
    translate([channel_offset-channel/2,15,0]) cube([channel,length-30,height]);
    translate([channel_offset-8,15,0]) cube([16,length-30,5]);
    translate([channel_offset,15,0]) cylinder(h=5,r=8);
    translate([channel_offset,length-15,0]) cylinder(h=5,r=8);
    translate([channel_offset,length-15,0]) cylinder(h=height, r=channel);
}
