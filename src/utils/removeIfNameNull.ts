export const RemoveIfNameNull = (data : any[][]) => {
    let rows_to_remove = [];
    for( let i = 3; i < data.length; i++){
        //for( let j = 0; j < data[i] .length; j++){
            if(data[i].length == 0 || data[i][0] == '' || data[i][0] == null){
                // console.log('Index : '+i+' Name : '+data[i])
                rows_to_remove.push(i);
                // break;
            }        
        //}

    }

    for(let index of rows_to_remove){
        data.splice(index,1);
    }

    return data;
}