export const RemoveAllNullRows = (data : any[][]) => {
    
    for( let i = 0; i < data.length; i++){
        let bool = true;
        for( let j = 0; j < data[i] .length; j++){
            bool = bool && ((data[i][j] == '' )|| (data[i][j] == null))
                
        }

        if(bool){
            return data.slice(0,i);
        }

    }

    return data;
}