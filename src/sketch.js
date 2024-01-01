
var points = [];
var density               = CONFIG.density; // Default: 20, 75, 100
var angle_multiplier      = CONFIG.angle_multiplier; // Default: 0.005
var flow_speed            = CONFIG.flow_speed; // Default: 1
var angle_z_randomness    = CONFIG.angle_z_randomness; // Default: 0
var angle_z_influence     = CONFIG.angle_z_influence; // Default: 1
var z_range               = CONFIG.z_range; // Default: 0.5

var fade_speed        = CONFIG.fade_speed; // Default: 2
var ellipse_radius    = CONFIG.ellipse_radius; // Default: 1
var ellipse_fade      = CONFIG.ellipse_fade; // Default: 128

var use_angle_for_color   = CONFIG.use_angle_for_color;
// If true, the color at the given point will be determined by a color evaluation function.
// If false, the point's color will be evaluated when it "jumps" or initializes
var always_evaluate_color = CONFIG.always_evaluate_color; // Default: true

var __canvas__;

function centerCanvas() {
    // __canvas__.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    resizeCanvas(windowWidth, windowHeight);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    __canvas__ = createCanvas(400,400);
    centerCanvas();
    angleMode(DEGREES)
    // colorMode(HSB, 360, 100, 100, 255);
    background(0);
    noiseDetail(1);
    
    const spacing = width / density;

    const r_z = random(-z_range, z_range);

    for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
            var v = createVector(x + random(-10, 10), y + random(-10, 10));
            v.z = r_z;
            if (always_evaluate_color) v.__color = color(v.x, height - v.y, lerp(255, 0, v.x / width), ellipse_fade);
            points.push(v);
        }
    }

}

function wrapVector(v, min, max) {
    if (v.x < 0 || v.y < 0 || v.x > width || v.y > height)
    {
        v.x = random(1, width - 1);
        v.y = random(1, height - 1);
        v.z += random(-angle_z_influence * 2, angle_z_influence * 2);
        v.z = constrain(v.z, -z_range, z_range);
        if (always_evaluate_color)
            v.__color = color(v.x, height - v.y, lerp(255, 0, v.x / width), ellipse_fade);
    }


    return v;
}

function draw() {
    background(0, fade_speed);
    noStroke();
    
    points = points.map((v, i) => {
        let angle = map(
            noise(v.x * angle_multiplier, v.y * angle_multiplier, v.z * angle_z_influence + random(20) * angle_multiplier * angle_z_randomness),
            0, 1, 0, 720
        );

        v.add(createVector(cos(angle), sin(angle)).mult(flow_speed));
        
        //#region Color

        var _clr = null;

        if (use_angle_for_color) { 
            colorMode(HSB, 360, 100, 100, 255);
            _clr = [(angle), 100, 50, ellipse_fade];
        } else {
            colorMode(RGB);
            _clr = always_evaluate_color ? [v.x, height - v.y, lerp(255, 0, v.x / width), ellipse_fade] : v.__color
        }

        fill(_clr);
        //#endregion Color
    
        ellipse(v.x, v.y, ellipse_radius);
        
        return wrapVector(v, createVector(0,0), createVector(width, height));
    });
}