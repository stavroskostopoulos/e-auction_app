

# Endpoints

`[POST] /login`

{username, pass}

Επιστρέφει ένα Json Web Token για το session του χρήστη που συνδέθηκε

________________

`[POST] api/users/save`

{username,pass,email,..}

Save new user
________________

`[POST] api/role/give`

{
    "username": "nota",
    "rolename": "BIDDER"
}

Give role to user
________________

`[GET] api/items`

GET all products

________________

`[POST] api/items/save`

POST save product

________________

`[POST] items/save/cat`

{
    "name": "Geforce 1080 Ti",
    "cats": ["texnologia","kati","katiallo"]
}


POST save product categories

________________

`[POST] items/filter/price`

{
    "low":"5",
    "high":"25"
}
get items filtered by price

________________

`[POST] api/items/filter/cat`

{
    "cats":["texnologia","kati"]
}

get items filtered by category

________________

`[DELETE] /api/role/accepted/{userid}`

DELETE not_accepted role from user with id {userid}

________________

`[DELETE] /api/users/{userid}`

DELETE user with id {userid}

________________









Shmeiwseis:
-
1)
`[POST] api/items/save`

POST save product

-first bid αχρείαστο νομίζω

-country αχρείαστο

-product owner (id)

-product category column (nomizw den xreaizetai na to kratame se all otable to category ,as pernaei mazi me auto to POST request kalutera kai as apo8hkeuetai sto item) (needless HTTP request)

2)

/login

-return user id mazi me to jwt ws object 
{
  id: sadasd
  
  token: asdsadas
}



3) /api/items

-prepei na doume mazi to pagination ( https://www.moesif.com/blog/technical/api-design/REST-API-Design-Filtering-Sorting-and-Pagination/ )
 example: On scroll/next page, client makes second request `GET /items?limit=20&offset=20`
