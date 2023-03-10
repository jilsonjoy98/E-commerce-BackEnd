const db= require('./db')

// all-products
const allProducts =()=>{
   return db.Product.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    Products: result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:"No data is present"
                }
            }
        }
    )
}

// view product
const viewProduct=(id)=>{
    return db.Product.findOne({
        id
    })
    .then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    Products: result
                }
            }
            else{
              return{
                statusCode:404,
                    message:"Product is unavialable"}
            }
        }
    )
}

// add to wishlist
const addtowishlist=(Product)=>{
    return db.Wishlist.findOne({
        id:Product.id
    }).then(result =>{
        if(result){
            return{
                statusCode:401,
                    message:"Item already exist inside wishlist"}
        }
        else{
            let newProduct =new db.Wishlist({
                id: Product.id,
                title: Product.title,
                price: Product.price,
                description: Product.description,
                category: Product.category,
                image: Product.image,
                rating: {
                  rate: Product.rating.rate,
                  count: Product.rating.count
                }
            })
            newProduct.save()
            return{
                statusCode:200,
                message: "Item added  to your Wishlist"
            }
        }
    })
}

// get wishlish
const getwishlist =()=>{
    return db.Wishlist.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    Wishlist: result
                }
            }
            else{
                return{
                    statusCode:404,
                    message:"Wishlist is empty"
                }
            }
        }
    )
}

// deleteItemWishlist api
const deleteItemWishlist=(id)=>{
    return db.Wishlist.deleteOne({id})
    .then((result)=>{
        if (result) {
            // if delete successful then get the updated wishlist
            return db.Wishlist.find().then(
                (result)=>{
                    if(result){
                        return{
                            statusCode:200,
                            Wishlist: result
                        }
                    }
                    else{
                        return{
                            statusCode:404,
                            message:"Wishlist is empty"
                        }
                    }
                }
            )
        }
        else
        {
            return{
                statusCode:404,
                message:"Item not Found"
            }
        }
    })
}

module.exports={
    allProducts,
    viewProduct,
    addtowishlist,
    getwishlist,
    deleteItemWishlist
}