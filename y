{
  "rules": {
    ".read": "auth !=null",
    ".write": "auth != null",
     "categories" :{
       ".read": true
     },
     "products":{
        ".read": true
      },
     "shopping-carts":{
       ".read" :true,
       ".write" :true
     },
      "orders":{
        ".indexOn": "userId",
         ".read": "auth !=null",
         ".write": "auth != null"
      },
     "users": {
      "$uid": {
        ".read": "true",
        ".write": "$uid === auth.uid"
      }
    }  
   
  }
}

