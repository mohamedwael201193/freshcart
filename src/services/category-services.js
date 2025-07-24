import { apiclinet } from "./api-clinet"

export async function getAllCategories() {
try{
const options = {
method: 'GET',
url: "/categories",
} 
const response = await apiclinet.request(options);
return response;
}
catch (error) {
    throw error;
}
}