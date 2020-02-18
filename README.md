# Smart Items
Responsive web application to display Walmart product search results and rank-ordered recommendations.

Technical stack: 

Node.js 

Exress 

React.js

![Diagram](https://raw.githubusercontent.com/SevenXuxiaowen/note-book/master/Diagram-01.png)

## Run
The server is running on `http://localhost:5000`
```bash 
cd smart-items
npm run dev
```
The client is running on `http://localhost:3000`
```bash
cd client
npm start
```

# Back-End
### RESTful API Design
| Resource | method | params |functions|
| --------------- | --- |---------------- |------------- |
| /               | GET |-                |test server  |
| /search/:keyword| GET |search keyword   |fetch products via keyword  |
| /detail/:id     | GET |product id       |fetch product detail via product id  |
| /recommend/:cat | GET |product category id |fetch recommend products via category  |
## GET /
Example
```bash
http GET http://localhost:5000/
```
```json
{
    "test": "server works well"
}
```
## GET /search/:keyword
```
[array item object]
{
-sku(string)
-name(string)
-text(string)
-image(url)
-review(number)
-price(number)
-cats(array)
    -id(string)
    -name(string)
},...
```
Example
```bash
http GET http://localhost:5000/search/laptop
```
```json
[
    {
        "cats": [
            {
                "id": "cat00000",
                "name": "Best Buy"
            },...
        ],
        "image": "https://pisces.bbystatic.com/image2...",
        "name": "Apple - MacBook Air®...",
        "price": 999.99,
        "review": 10374,
        "sku": 5465502,
        "text": "Intel&#174; Core&#8482; i5 processor..."
    },...
]
```
## GET /detail/:id
```
{object}
{
-sku(string)
-image(string)
-name(string)
-text(string)
-manufacturer(string)
-modelNumber(string)
-score(number)
-review(number)
-price(number)
-items(array)
    {array item object}
-cats(array)
    -id(string)
    -name(string)
-color(array)
    {array item object}
-features(array)
    {array item object}
}
```
Example request
```bash
http GET http://localhost:5000/detail/7007013
```
Example response
```json
{
    "cats": [
        {
            "id": "cat00000",
            "name": "Best Buy"
        },...
    ],
    "color": "White",
    "features": [
        "Compatible with select Apple iPad&#174;, ..."
    ],
    "image": "https://pisces.bbystatic.com/image2...",
    "items": [
        "Apple® Lightning Digital A/V Adapter"
    ],
    "manufacturer": "Apple",
    "modelNumber": "MD826AM/A",
    "name": "Apple - Lightning Digital...",
    "price": 54.99,
    "review": 13906,
    "score": 4.7,
    "sku": 7007013,
    "text": "Compatible with Apple iPad&#174..."
}
```
## GET /recommend/:cat
```
[array]
{
-sku(string)
-name(string)
-text(string)
-image(url)
-review(number)
-price(number)
-cat(string)
},...
```
Example request
```bash
http GET http://localhost:5000/recommends/abcat0811002
```
```json
[
    {
        "cat": "abcat0811002",
        "image": "https://pisces.bbystatic.com...",
        "name": "Verizon - Ellipsis Jetpack...",
        "price": 49.99,
        "review": 453,
        "sku": "5971800",
        "text": "Compatible with most Wi-Fi enabled..."
    },...
]
```
# Front-End
Structure
- Main
    - Nav - nav bar
        - Search - input search keyword
    - Detail - render product detail
    - Search - render recommend products
    - Recommend - render recommend products
        - Items
- UserFunctions - helper functions that handle data exchange with server
![Diagram](https://raw.githubusercontent.com/SevenXuxiaowen/note-book/master/Diagram-01.png)
