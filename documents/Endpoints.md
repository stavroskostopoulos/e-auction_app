

# Endpoints

`[POST] /login`

{username, pass}

Επιστρέφει ένα Json Web Token για το session του χρήστη που συνδέθηκε

________________

`[POST] api/users/save`

{
    "username":"kwstop",
    "pass":"ll",
    "roles": [
        {
            "name" : "BIDDER"
        }
    ]
}

Save new user
________________

`[POST] api/role/give`

{
    "username": "nota",
    "rolename": "BIDDER"
}

Give role to user

________________

`[GET] api/users/{offset}`

GET all users

________________

`[GET] api/users/id/{userid}`

GET user from id

________________

`[GET] api/users/{username}`

GET user from username

________________

`[GET] api/items`

GET all products

________________

`[GET] api/items/{itemid}`

GET product by id

________________

`[GET] api/items/recommended/{userid}`

GET recommended results with matrix factorization(load first)

________________

`[GET] api/items/loadrec/{userid}`

load recommended results with matrix factorization

________________

`[POST] api/items/save`

POST save product

{
    "name":"SSD WD 3002",
    "buyPrice":"60",
    "description":"ssd xwriktikothta 500gb",
    "firstBid":"0",
    "currentBid":0,
    "bidCount":0,
    "latitude":"3444",
    "longitude":"2222",
    "country":"Greece",
    "category":["texnologia","allo"]
}

________________

`[POST] items/save/cat`

{
    "itemId":1,
    "cats":["texnologia","kati"]
}

POST save product categories

________________

`[POST] items/filter/price?page=0&size=3`

{
    "low":"5",
    "high":"25"
}
get items filtered by price

________________

`[POST] api/items/filter/cat/{offset}`

{
    "cats":["texnologia","kati"]
}

get items filtered by category(give offset for pagination)

________________

`[DELETE] /api/role/accepted/{userid}`

DELETE not_accepted role from user with id {userid}

________________

`[DELETE] /api/users/{userid}`

DELETE user with id {userid}

________________


`[POST] api/items/filter/desc/{offset}`

{
    "word":"για"
}

get items filtered by text search
________________


`[POST] api/messages/save`

{
    "content": "something long",
    "receiverId": 2,
    "senderId": 3
}

send message

________________


`[POST] api/messages/inbox/0`

1

get inbox (yes send just the id without brackets)

________________

`[POST] api/bids/save`

{
    "itemId": 5,
    "time":12,
    "amount":90,
    "bidder":{
        "userId": 6,
        "rating": "4",
        "location": "Goetve",
        "country": "Denmark"
    }
}

save bid

________________



`[PUT] api/users/update`

{
    "username": "kwstop",
    "pass": "hhh",
    "realname": "fff",
    "afm": "Sss",
    "tele": "335552"
}

update user fields(username cannot change)

________________


Tasks:

[done]

 

