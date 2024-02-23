class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawBezierCurve({x: 100, y: 100}, {x: 100, y: 400}, {x: 700, y: 400}, {x: 700, y: 100}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawBezierCurve({x: 100, y: 500}, {x: 150, y: 350}, {x: 650, y: 350}, {x: 700, y: 500}, this.num_curve_sections, [255, 0, 0, 255], framebuffer);

        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        //this.drawLine({x: 100, y: 100}, {x: 600, y: 300}, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        this.drawCircle({x: 200, y: 300}, 150, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawCircle({x: 500, y: 400}, 100, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let point_a, point_b, point_c, point_d, point_e, point_f, point_g, point_h;
        point_a = {x: 600, y: 100};
        point_b = {x: 700, y: 200};
        point_c = {x: 600, y: 300};
        point_d = {x: 400, y: 300};
        point_e = {x: 300, y: 200};
        point_f = {x: 400, y: 100};
        this.drawConvexPolygon([point_a, point_b, point_c, point_d, point_e, point_f], [0, 128, 128, 255], framebuffer);

        point_a = {x: 200, y: 175};
        point_b = {x: 350, y: 300};
        point_c = {x: 400, y: 400};
        point_d = {x: 350, y: 500};
        point_e = {x: 200, y: 500};
        point_f = {x: 100, y: 400};
        point_g = {x: 50, y: 300};
        point_h = {x: 75, y: 200};
        this.drawConvexPolygon([point_a, point_b, point_c, point_d, point_e, point_f, point_g, point_h], [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        // J
        console.log(this.show_points);
        this.drawCircle({x: 150, y: 500}, 20, this.num_curve_sections, [0, 128, 128, 255], framebuffer);
        
        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        function calcCord(p0, p1, p2, p3, t){
            return ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * (t ** 2) * p2 + (t ** 3) * p3;
        }

        // Draw vertex for control points
        this.drawVertex(p1, [0, 255, 0, 255], framebuffer);
        this.drawVertex(p2, [0, 255, 0, 255], framebuffer);

        // Draw Bezier curve
        let increase = 1.0 / num_edges;
        for (let i = 0; i < num_edges; i++){
            let x1 = calcCord(p0.x, p1.x, p2.x, p3.x, i * increase);
            let y1 = calcCord(p0.y, p1.y, p2.y, p3.y, i * increase);
            let x2 = calcCord(p0.x, p1.x, p2.x, p3.x, (i + 1) * increase);
            let y2 = calcCord(p0.y, p1.y, p2.y, p3.y, (i + 1) * increase);
            x1 = Math.round(x1);
            x2 = Math.round(x2);
            y1 = Math.round(y1);
            y2 = Math.round(y2);
            this.drawLine({x: x1, y: y1}, {x: x2, y: y2}, color, framebuffer);
            this.drawVertex({x: x1, y: y1}, [0, 0, 0, 255], framebuffer);
            if (i == num_edges - 1) {
                this.drawVertex({x: x2, y: y2}, [0, 0, 0, 255], framebuffer);
            }
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        function calcCordX(radians){
            return center.x + radius * Math.cos(radians);
        }
        function calcCordY(radians){
            return center.y + radius * Math.sin(radians);
        }
        let increase = 2 * Math.PI / num_edges;
        for (let i = 0; i < num_edges; i++){
            let x1 = calcCordX(i * increase);
            let y1 = calcCordY(i * increase);
            let x2 = calcCordX((i + 1) * increase);
            let y2 = calcCordY((i + 1) * increase);
            x1 = Math.round(x1);
            x2 = Math.round(x2);
            y1 = Math.round(y1);
            y2 = Math.round(y2);
            this.drawLine({x: x1, y: y1}, {x: x2, y: y2}, color, framebuffer);
            this.drawVertex({x: x1, y: y1}, [0, 0, 0, 255], framebuffer);
            if (i == num_edges - 1) {
                this.drawVertex({x: x2, y: y2}, [0, 0, 0, 255], framebuffer);
            }
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        for (let i = 0; i < vertex_list.length - 2; i++){
            this.drawTriangle(vertex_list[0], vertex_list[i + 1], vertex_list[i + 2], color, framebuffer);
            this.drawVertex(vertex_list[0], [0, 0, 0, 255], framebuffer);
            this.drawVertex(vertex_list[i + 1], [0, 0, 0, 255], framebuffer);
            this.drawVertex(vertex_list[i + 2], [0, 0, 0, 255], framebuffer);
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // Copy of circle argorithm without the feature of adding vertex
        if (!this.show_points) {
            return;
        }
        let radius = 5;
        let num_sides = 36;
        function calcCordX(radians){
            return v.x + radius * Math.cos(radians);
        }
        function calcCordY(radians){
            return v.y + radius * Math.sin(radians);
        }
        let increase = 2 * Math.PI / num_sides;
        for (let i = 0; i < num_sides; i++){
            let x1 = calcCordX(i * increase);
            let y1 = calcCordY(i * increase);
            let x2 = calcCordX((i + 1) * increase);
            let y2 = calcCordY((i + 1) * increase);
            x1 = Math.round(x1);
            x2 = Math.round(x2);
            y1 = Math.round(y1);
            y2 = Math.round(y2);
            this.drawLine({x: x1, y: y1}, {x: x2, y: y2}, color, framebuffer);
        }
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
