

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

`[DELETE] /api/role/accepted/{userid}`

DELETE not_accepted role from user with id {userid}

________________

`[DELETE] /api/users/{userid}`

DELETE user with id {userid}

________________
