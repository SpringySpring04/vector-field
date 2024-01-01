# Vector Flow

This project uses p5.js to create an interesting visualization of fluid movement.

## Running the project
To start the project, just open `index.html` in a browser of your choice as long as it can run JavaScript (most browsers, like Google Chrome, Opera (GX), Microsoft Edge, whatever you choose).

FOR MORE ADVANCED USERS:
If you have Visual Studio Code and the Live Server extension for said software, you can clone this repository and open in VSCode, and use the 'Go Live' button in the bottom right to open the `index.html` on a locally hosted server, which will respond to changes made to files in the project and automatically refresh the page as needed. Just install the Live Server extension, and preferably the GitHub Pull Requests and Issues extension to easily clone and work with this repository yourself.

## Configuration

You can configure the settings of the vector flow's movement in top-level `config.js`.

To see the changes you make in `config.js`, you will need to refresh the page.

### Configurable Properties

* General and Utility Settings
    * (`number`) Density - The number of "points" or "particles" in the simulation.
    * (`number`) Angle Multiplier - The amount of turning each point does. Gives the "wavy" look.
    * (`number`) Flow Speed - General speed of the simulation, but also controls how many pixels forward each point moves, which can cause "jumps" in the lines if this is too high.
    * (`boolean`) Use Angle For Color - Determines whether the color of each drawn circle should be based on the angle of the vector, or, if false, it should be based on sampling the noise texture at the vector's current position.
    * (`boolean`) Always Evaluate Color - Determines if the color evaluation should always be evaluated. If not, it will only be updated when the line "jumps" or initializes (?) (I don't remember what this means, so it's probably best to just leave this true).
* Noise Texture Configuration
    * (`number`) Angle Z Randomness - How far in the Z Range for each point to randomly sample the third component of the 3D noise texture.
    * (`number`) Angle Z Influence - Multiplier of the final amount of the Z sampling to controls the noise texture further.
    * (`number`) Z Range - Maximum sample range for the Z sampling.
* Color and Drawing Settings
    * (`number`) Fade Speed - Controls the opacity of the screen clear redraw. This also controls how quickly old colors in the simulation will be faded away, with higher values making them fade more quickly.
    * (`number`) Ellipse Radius - Controls the radius of each drawn point. The simulation works by drawing circles where the points are located at, and each circle is, by default, just 1 pixel in size.
    * (`number`) Ellipse Fade - Controls the opacity of the drawn circles. This also has an effect on how quickly the lines fade, but can also have some interesting effects by itself.