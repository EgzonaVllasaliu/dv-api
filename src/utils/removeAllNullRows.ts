export const RemoveAllNullRows = (data : any[][]) => {
    let rows_to_remove = [];
    for( let i = 0; i < data.length; i++){
        // console.log('Index : '+i+' Name : '+data[i])
        for( let j = 0; j < data[i] .length; j++){
            if(data[i][j] == '' || data[i][j] == null){
                console.log('Index : '+i+' Name : '+data[i])
                rows_to_remove.push(i);
                break;
            }        
        }

    }

    for(let index of rows_to_remove){
        data.splice(index,1);
    }

    return data;
}