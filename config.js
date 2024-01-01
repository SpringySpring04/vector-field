
/**
 * This file contains configuration properties for the project,
 * that controls the behavior of the simulation.
 * 
 * IMPORTANT: For less advanced users, make sure that each configuration follows
 * the given type of that property, and make sure that each value has a ',' after it.
 * If you do not have a comma after each property in this configuration, the program
 * will have an error.
 * 
 * A property is defined as 'key: value' pairs, where 'key' is the name of the property
 * and 'value' is the value you define. You must ONLY change the value and make sure
 * that it is of the correct type, either {number} or {boolean} where {boolean} can either
 * be 'true' or 'false' (without quotes).
 */

const CONFIG = { // DO NOT TOUCH THIS LINE.
    /**
     * This controls the number of moving Vector points in the simulation.
     * Higher values gives more quality at the cost of performance.
     * If you have a decent computer, I would recommend values of 100-150.
     * Try to avoid going over, say, 500? 
     * @type {number}
     * @default 75
     */
    density: 100,

    /**
     * Controls the amount by which the points will turn by which gives the
     * smooth "wavy" look.
     * @type {number}
     * @default 0.005
     */
    angle_multiplier: 0.005,

    /**
     * Controls the overall speed of the simulation and how much each point moves forward
     * by. 1 is the default speed, values above 1 makes the speed faster, and values below 1 
     * make the speed slower.
     * @type {number}
     * @default 1
     */
    flow_speed: 1,

    /**
     * Controls how far each point's smoothed random direction will reach into the Z-values
     * of the 3D noise texture (by default, this is 0, and thus points will only sample 
     * from a 2D noise texture). This controls the maximum depth that the Z-value will be
     * sampled from.
     * @type {number}
     * @default 0
     */
    angle_z_randomness: 0,

    /**
     * Multiplier for z-randomness sampling of the 3D noise texture. For example, if this == 0.5,
     * and the generated random value from `random(0,angle_z_randomness)` where `angle_z_randomness = 1` is
     * equal to 0.5, then the final value by which each point will sample the Z-value of the 3D noise texture
     * will be `0.25`. 
     * @type {number}
     * @default 0
     */
    angle_z_influence: 0,

    /**
     * Controls the maximum sample range of the z-values of the 3D noise textures.
     * Note that if `angle_z_randomness` and `angle_z_influence` are both 0, this
     * does nothing.
     * @type {number}
     * @default 10
     */
    z_range: 10,
    
    /**
     * Controls how quickly the colors of the simulation will fade into the background.
     * This is actually just the opacity of the `background` function, from 0-255, which clears
     * the screen for the next redraw, but by setting the opacity really low, you can preserver
     * the old screen for the "historic" data visualization
     * @type {number}
     * @default 2
     */
    fade_speed: 1,

    /**
     * The simulation works by drawing filled circles of color at the location of each
     * point. You can change the radius of the circle to get more interesting results
     * as desired.
     * @type {number}
     * @default 1
     */
    ellipse_radius: 1,

    /**
     * This controls the opacity of each circle that is drawn. 
     * Range: 0-255
     * @type {number}
     * @default 128
     */
    ellipse_fade: 255,

    /**
     * If true, the color of each circle will be determined by the angle of the vector that is drawing it.
     * If false, the color of each circle will sample the 2D noise texture from screenspace.
     * @type {boolean}
     * @default true
     */
    use_angle_for_color: true,

    /**
     * If true, the color of each circle will be evaluated every frame. If false, the color will only change when
     * the point "jumps" or "initializes". (I don't know what this means anymore, this was just a comment in my actual code,
     * I would just say leave this true and don't touch it unless you know what you're doing, but you do you)
     * @type {boolean}
     * @default true
     */
    always_evaluate_color: true

}