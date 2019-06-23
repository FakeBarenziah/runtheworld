const MapMaker= (type:string):Array<number> =>{
  const outArray = [];
  const colsArray = [];

  function levelCheck(aVal:number):boolean{
    return aVal>0
  };

  let level:number = 125;

  let castle_towerflag:boolean = false
  let castle_towerEnd:number

  for (let i=0; i < 300; i++){

    let levelOffset:number


    if(level===140){

      levelOffset = -1

    }else if (i>280&&type!=="Castle"){
      if(level>125){
        levelOffset=-1
      }else if(level<125){
        levelOffset=1
      }
      else{levelOffset = 0}

    } else if(type==="Castle"){

      levelOffset = 0

      if(i===5||i===290){
        levelOffset = -40
      } else if(i===10||i===295){
        levelOffset = 40
      } else {

        if(!castle_towerflag && i > 20 && i < 280){
        var towerChance = Math.random()
          if(towerChance<0.5 && level<50){
            levelOffset=-5
            castle_towerEnd = i+Math.ceil(Math.random()*10)+2
            castle_towerflag = true
          }
        }
        if(i===castle_towerEnd){
          levelOffset=5
          castle_towerflag = false
        }
      }
    } else if(type==="Desert") {
      levelOffset = Math.floor((Math.random()*3)-1);
    } else if (type==="Mountain") {
      levelOffset = Math.floor((Math.random()*5)-2);
    } else {
      levelOffset = Math.floor((Math.random()*3)-1);
    }

    const column:number[] = [];

    const newLevel:number = level + levelOffset

    for(let j=0; j<150; j++){

      if(j < newLevel){
        column.push(0)
      }
      else if(j === newLevel){
        column.push(Math.floor((Math.random()*18)+10))
      }
      else if(j > newLevel){
        column.push(Math.floor((Math.random()*9)+1))
      }
    }

    colsArray.push(column)
    level = colsArray[colsArray.length-1].findIndex(levelCheck)
  }

  while(colsArray[0].length){
    colsArray.forEach(each => outArray.push(each.shift()))
  }

  return outArray
}

export default MapMaker
