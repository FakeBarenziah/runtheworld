const MapMaker= (prevCol?:Array<number>):Array<number> =>{
  const outArray = [];
  const colsArray = [];

  function levelCheck(aVal:number):boolean{
    return aVal>0
  };

  let level:number;

  if(prevCol){
   level = prevCol.findIndex(levelCheck)
  } else {
    level = 570
  }

  for (let i=0; i < 600; i++){

    const levelOffset:number = Math.floor((Math.random()*3)-1);

    const column:number[] = [];

    const newLevel:number = level + levelOffset

    for(let j=0; j<600; j++){

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

  while

  return outArray
}

export default MapMaker
