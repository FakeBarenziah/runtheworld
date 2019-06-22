const MapMaker= ():Array<number> =>{
  const outArray = [];
  const colsArray = [];

  function levelCheck(aVal:number):boolean{
    return aVal>0
  };

  let level:number = 125;

  for (let i=0; i < 300; i++){

    const levelOffset:number = Math.floor((Math.random()*3)-1);

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
