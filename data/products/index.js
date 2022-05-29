import APIInstance from "..";

export const GetProducts = async (page, limit) => {
  try {
    const response = await APIInstance.get(`/gifts?page[number]=${page}&page[size]=${limit}`)

    return response
  } catch (error) {
    console.log(error)
    
    return error.response
  }
}

export const GetDetailProduct = async (id) => {
  try {
    const response = await APIInstance.get(`/gifts/${id}`)

    return response
  } catch (error) {
    console.log(error)

    return error.response
  }
}

export const PostWishlistProduct = async (id) => {
  try {
    const response = await APIInstance.post(`/gifts/${id}/wishlist`)

    return response
  } catch (error) {
    console.log(error)

    return error.response
  }
} 