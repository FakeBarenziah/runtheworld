const MapMaker= (type:string):Array<number> =>{
  const outArray = [];
  const colsArray = [];

  // This function returns the outArray,
  // which is a flat array containing all
  // of the values to assign tiles to a
  // world. Phaser makes the maps from arrays
  // of values to assign corresponding tiles
  // from a tileset. It builds the maps
  // row-by-row, but we want to generate
  // them column-by-column! No big deal,
  // we just need to reorder the elements
  // before returning it.

  // The colsArray will have a number
  // of arrays in it equal to the width of
  // the world (here it is 150 tiles), and
  // each array will have a number of elements
  // equal to the height of the world (100)

  // MapMaker accepts a string which assigns the type

  function levelCheck(aVal:number):boolean{
    return aVal>0
    // Helper function to check when
    // tiles in the previous column
    // start to have non-zero values.
  };

  // Initialize the height of the first
  // column to something that gives us
  // some headroom
  let level:number = 80;

  // Variables for making the castle
  // towers that need to be outside the
  // scope of the for loop
  let castle_towerflag:boolean = false
  let castle_towerEnd:number
  let castle_towerHeight:number

  // Make 150 columns
  for (let i=0; i < 150; i++){

    // Initialize a level offset to
    // manipulate the index of each
    // column to start adding blocks
    let levelOffset:number


    if(level>=90){
      // If the level of collision
      // tiles has fallen to near
      // the bottom, raise it by 2
      levelOffset = -2

    } else if (level<=10){
      // Or if it has risen to be near the
      // top, lower it
      levelOffset = 2
    }
    // If we are making the last 20 columns
    // and are above or below the level the
    // next one is going to start at, we
    // need to start moving towards 80.
    // Castle types have their own logic
    // for changing level that obviates this.
     else if (i>130&&type!=="Castle"){
      if(type==="Mountain"){
        // Mountain terrain can increment
        // and decrement by 2
        if(level>81){
          levelOffset=-2
        } else if(level<80){
          levelOffset=2
        } else{
          levelOffset = 0
        }
      } else {
        // Other terrain types offset
        // by one at a time
        if(level>80){
          levelOffset=-1
        } else if(level<80){
          levelOffset=1
        } else{
          levelOffset = 0
        }
      }

      // If we are not preparing the level
      // for meeting the next world or
      // correcting extreme elevations, we
      // can apply the normal rules for
      // procedurally generating height
    } else if(type==="Castle"){
      // Castles are generally flat, so have
      // a levelOffset of zero...
      levelOffset = 0
      // ...unless we're making walls.
      // The walls rise by 40 tiles for
      // 5 tiles, and then fall by 40
      // tiles, 5 tiles from the edge
      // of the castle zone.
      if(i===5||i===140){
        levelOffset = -40
      } else if(i===10||i===145){
        levelOffset = 40
      } else {

        // If we are within the walls of a Castle area,
        // we can make towers. First, it checks if we
        // are already making a tower, and if not,
        // it makes one 6% of the time.
        if(!castle_towerflag && i > 20 && i < 130){
        var towerChance = Math.random()
          if(towerChance<0.06 && level===80){
            castle_towerHeight = Math.floor(Math.random()*20)+10
            // When a tower is to be built, its height is
            // randomly determined between 10 and 29, and
            // this value is assigned to the variable in
            // the outer scope.
            levelOffset=-castle_towerHeight
            // The level offset is changed to reflect the
            // determined height, and the Castle type doesn't
            // change it otherwise.
            castle_towerEnd = i+Math.ceil(Math.random()*6)+2
            // The tower's width is defined by randomly
            // determining its endpoint 3 to 8 columns
            // from its start.
            castle_towerflag = true
            // Flags a tower as being built so another
            // one doesn't get built on top of it.
          }
        }
        if(i===castle_towerEnd){
          // When we get to the index that is to be the
          // end of the tower, we lower the column height
          // by the same amount it was raised earlier and
          // reset the build tower flag.
          levelOffset=castle_towerHeight
          castle_towerflag = false
        }
      }
    } else if (type==="Mountain") {
      levelOffset = Math.floor((Math.random()*5)-2);
    } else {
      // All other terrain can vary by one tile per column
      levelOffset = Math.floor((Math.random()*3)-1);
    }

    const column:number[] = [];

    const newLevel:number = level + levelOffset

    for(let j=0; j<100; j++){

      // This for loop makes each column

      if(j < newLevel){
        // Pushes zeroes into the column until
        // the index reaches the level we have
        // decided to start adding tiles.
        column.push(0)
      }
      else if(j === newLevel){
        // When we reach the level determined by the
        // outer loop, we push a random value to
        // correspond with a tile from the 18
        // surface-design tiles in the tileset
        column.push(Math.floor((Math.random()*18)+10))
      }
      else if(j > newLevel){
        // Beyond that, we push a random value to
        // correspond with one of the 9 below-surface
        // design tiles.
        column.push(Math.floor((Math.random()*9)+1))
      }
    }

    // Push that full column into the colsArray
    colsArray.push(column)

    // Reassign the level to be the first index
    // of the column we just made that is not a zero
    // so that the next column can refernce the height
    // of the one before it.
    level = colsArray[colsArray.length-1].findIndex(levelCheck)
  }

  // Move the first item in each column array into the main
  // array until colsArray is full of emptry arrays.
  while(colsArray[0].length){
    colsArray.forEach(each => outArray.push(each.shift()))
  }

  return outArray
}

export default MapMaker
