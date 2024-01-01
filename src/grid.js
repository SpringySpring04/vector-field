class Grid {

    //#region Type Defines

    /**
     * @description Callback function for iterating over elements of a Grid.
     * @callback Grid_RenderCallback
     * @param {number | undefined} value The value at the given index in the grid.
     * @param {number | undefined} x The x coordinate of the current iteration.
     * @param {number | undefined} y The y coordinate of the current iteration.
     * @param {number | undefined} i The 1-dimensional index of the current entry in the 1D data array in the grid.
     * @param {any[]  | undefined} array Reference to the array that is being iterated over.
     * @returns {void}
     */
    
    //#endregion Type Defines

    //#region Members

    /**
     * @description The "width" and "height" (number of cells) per column and row respectively.
     * Therefore, the actual number of cells in a grid is this number squared.
     * @type {number}
     * @readonly
     */
    numCells = 20;

    /**
     * @description The width and height of a single cell in the grid in pixels.
     * @type {number}
     * @readonly
     */
    cellSize = NaN;
    
    /**
     * @description Holds all the data for each individual cell.
     * @type {Array}
     * @private
     */
    _data = [];

    //#endregion

    /**
     * @constructor
     * @description Creates a grid, each cell's size is dependent of the width of the canvas and the _numCells.
     * @param {number} _numCells Number of cells both horizontally and vertically.
     */
    constructor(_numCells = 20, _initializationFunction=()=>0) {
        this.numCells = _numCells;
        this.cellSize = width / this.numCells;
        this._data = [];
        this.fill(_initializationFunction);
    }

    //#region Getters

    /**
     * @description Returns the total number of cells in the grid.
     * @alias length
     */
    get totalNumCells() {
        return this.numCells * this.numCells;
    }
    
    /**
     * Returns the total number of entries in the data array (number of cells in the grid)
     * @returns {number}
     */
    get length() {
        return this.numCells * this.numCells;
    }

    /**
     * @description The total number of cells per row.
     * @alias numCells
     */
    get numCellsPerRow() {
        return this.numCells;
    }

    /**
     * @description The total number of cells per column
     * @alias numCells
     */
    get numCellsPerColumn() {
        return this.numCells;
    }

    //#endregion Getters

    //#region Iteration Methods
    
    /**
     * @description Iterator symbol for usage in `for ... of` statements.
     * @yields {[any, number, number, number]} `[value, x, y, i]`
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            const xy = Grid.indexToCoordinate(this.numCells, i);
            let x = xy.x, y = xy.y;
            let value = this.elementAt(i);
            yield [value, x, y, i];
        }
    }
    
    /**
     * @description Calls the given callback function for each element in the grid. 
     * @param {Grid_RenderCallback} cb The callback function called for each element in the grid, passing in the value, 2D (x,y) coordinates, 1D index, and a reference to the data array iterated over. 
    */
   forEach(cb) {
        for (let i = 0; i < this.length; i++) {
            const xy = Grid.indexToCoordinate(this.numCells, i);
            let x = xy.x, y = xy.y;
            let value = this.elementAt(i);
            cb(value, x, y, i, this._data);
        }
    }

    /**
     * @description Fills all entries in the grid with the return value of the given function
     * @param {Grid_RenderCallback} valueCb The callback function, passing in index, x and y coordinates, and reference to the data array.
     */
    fill(valueCb) {
        for (let i = 0; i < this.totalNumCells; i++) {
            const xy = Grid.indexToCoordinate(this.numCells, i);
            this._data[i] = valueCb(i, xy.x, xy.y, this._data);
        }
    }

    //#endregion Iteration Methods

    //#region Grid Properties and Methods

    /**
     * @overload Determines if the point is within the grid's bounds (number of cells-wise)
     * @param {number} x
     * @param {number} y 
     * @returns {boolean} 
     */
    /**
     * @overload Determines if the point is within the grid's bounds (number of cells-wise)
     * @param {unknown & {x:number, y:number}} pt
     * @returns {boolean}
    */
    isInGrid(...args) {
        var x = -1, y = -1;
        if (typeof args[0] === 'number') {
            x = args[0];
            y = args[1];
        } else if (typeof args[0] === 'object' && typeof args[0].x === 'number' && typeof args[0].y === 'number') {
            x = args[0].x;
            y = args[0].y;
        } else {
            throw new TypeError("Arguments must be either \'number, number\' or \'{..., x: number, y: number}\'");
        }
        return x >= 0 && x < this.numCells && y >= 0 && y < this.numCells; 
    }

    /**
     * @description Renders the grid for debugging purposes
     * @param {Grid_RenderCallback} cb The callback function, passing value, x, y, i, and the data array.
     */
    debugRender(cb) {
        push();
        /**@type {any}*/ let value;
        /**@type {number}*/ let x;
        /**@type {number}*/ let y;
        /**@type {number}*/ let i;
        for ([value, x, y, i] of this) {
            cb(value, x, y, i, this._data);
        }
        pop();
    }

    //#endregion

    //#region Element accessor methods
    
    /**
     * Returns the 2D coordinate corresponding to the 1D data index in a grid of `width` number of columns.
     * @param {number} width The width (in cells) of the grid
     * @param {number} i The 1D index.
     * @throws {RangeError} if `i` is out of range.
     * @returns {{x: number, y: number}}
     */
    static indexToCoordinate(width, i) {
        
        i = Math.floor(i);
        width = Math.floor(width);

        var ret = {x: -1, y: -1};
        if (i < 0 || i >= width * width) {
            throw new RangeError(`index '${i}' is out of the allowed range [0, ${width * width})`);
        }
        ret.x = i % width;
        ret.y = Math.floor(i / width);
        return ret;
    }

    /**
     * @overload Returns the 1D data index corresponding to the row/column coordinates in the grid of `width` number of columns.
     * @param {number} width 
     * @param  {number} x
     * @param {number} y 
     * @throws {RangeError} If the coordinates are out of range.
     * @returns {number}
     */
    /**
     * @overload Returns the 1D data index corresponding to the row/column coordinates in the grid of `width` number of columns.
     * @param {number} width 
     * @param  {unknown & {x: number, y: number}} pt
     * @throws {RangeError} If the coordinates are out of range.
     * @returns {number}
     */
    static coordinateToIndex(width, ...args) {
        width = Math.floor(width);
        var x = 0, y = 0;
        if (typeof args[0] === 'number' && typeof args[1] === 'number') {
            x = args[0]; y = args[1];
        } else if (typeof args[0] === 'object' && typeof args[0].x === 'number' && typeof args[1].x === 'number') {
            x = args[0].x; y = args[1].y;
        } else {
            throw new TypeError("Arguments must be of types \'number, number, number\' or \'number, {..., x: number, y: number}\'");
        }
        x = Math.floor(x); y = Math.floor(y);
        if (x < 0 || x >= width || y < 0 || y >= width) {
            throw new RangeError(`x,y pair (${x}, ${y}) is out of range of a grid of sizes [${width}, ${width}]`);
        }
        return x + width * y;
    }

    /**
     * @overload Returns the object held at the index i in the 1D data array.
     * @param {number} i
     * @returns {any} 
     */
    /**
     * @overload Returns the value held at the given cell coordinates in the grid.
     * @param {number} x
     * @param {number} y
     * @returns {any} 
     */
    /**
     * @overload Returns the value held at the given cell coordinates in the grid.
     * @param {unknown & {x: number, y: number}} pt
     * @returns {any} 
     */
    elementAt(...args) {
        var x = 0, y = 0;
        if (typeof args[0] === 'number' && typeof args[1] === 'undefined') {
            const xy = Grid.indexToCoordinate(this.numCells, args[0]);
            x = xy.x;
            y = xy.y;
        } else if (typeof args[0] === 'number' && typeof args[1] === 'number') {
            x = args[0];
            y = args[1];
        } else if (typeof args[0] === 'object' && typeof args[0].x === 'number' && typeof args[0].y === 'number') {
            x = args[0].x;
            y = args[0].y;
        } else {
            throw new TypeError("Argument must be either \'number\', \'number, number\', or \'{..., x: number, y: number}\'");
        }
        x = Math.floor(x);
        y = Math.floor(y);
        if (!this.isInGrid(x, y)) {
            throw new RangeError(`Coordinates (${x}, ${y}) is out of range of grid of dimensions [${this.numCells, this.numCells}]`);
        }
        return this._data[Grid.coordinateToIndex(this.numCells, x, y)];
    }

    /**
     * @overload Returns the object held at the index i in the 1D data array.
     * @param {number} i
     * @param {any} value
     */
    /**
     * @overload Returns the value held at the given cell coordinates in the grid.
     * @param {number} x
     * @param {number} y
     * @param {any} value
     */
    /**
     * @overload Returns the value held at the given cell coordinates in the grid.
     * @param {unknown & {x: number, y: number}} pt
     * @param {any} value
     */
    insertAt(...args) {
        var x = 0, y = 0;
        var value;
        if (typeof args[0] === 'number' && typeof args[1] !== 'undefined') {
            const xy = Grid.indexToCoordinate(this.numCells, args[0]);
            x = xy.x;
            y = xy.y;
            value = args[1];
        } else if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] !== 'undefined') {
            x = args[0];
            y = args[1];
            value = args[2];
        } else if (typeof args[0] === 'object' && typeof args[0].x === 'number' && typeof args[0].y === 'number' && typeof args[1] !== 'undefined') {
            x = args[0].x;
            y = args[0].y;
            value = args[1];
        } else {
            throw new TypeError("Argument must be either \'number, any\', \'number, number, any\', or \'{..., x: number, y: number}, any\'");
        }
        x = Math.floor(x);
        y = Math.floor(y);
        if (!this.isInGrid(x, y)) {
            throw new RangeError(`Coordinates (${x}, ${y}) is out of range of grid of dimensions [${this.numCells, this.numCells}]`);
        }
        this._data[Grid.coordinateToIndex(this.numCells, x, y)] = value;
    }

    //#endregion Element accessor methods

    

}