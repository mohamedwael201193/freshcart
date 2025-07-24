import { apiclinet } from "./api-clinet"

export async  function getAllBrands(){
    try{ 
        const options = {
            method: 'GET',
            url: '/brands',
    }
const response =await apiclinet.request(options);
return response;

}
    catch(error){
        throw error;
    }
}