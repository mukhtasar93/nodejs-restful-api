# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headres :
- Authorization : token

Request Body :

```json
{
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
}
```

Response Success :

```json
{
    "data " :{
        "id" : 1,
        "street" : "Jalan apa",
        "city" : "Kota apa",
        "province" : "Provinsi apa",
        "country" : "Negara apa",
        "postal_code" : "Kode pos"
    }
}
```

Response Error :

```json
{
    "errors" : "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headres :
- Authorization : token

Request Body :

```json
{
    "street" : "Jalan apa",
    "city" : "Kota apa",
    "province" : "Provinsi apa",
    "country" : "Negara apa",
    "postal_code" : "Kode pos"
}
```

Response Success :

```json
{
    "data" : {
        "id" : 1,
        "street" : "Jalan apa",
        "city" : "Kota apa",
        "province" : "Provinsi apa",
        "country" : "Negara apa",
        "postal_code" : "Kode pos"
    }
}
```

Response Error :

```json
{
    "errors" : "Country is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headres :
- Authorization : token

Response Success :

```json
{
    "data" : {
        "id" : 1,
        "street" : "Jalan apa",
        "city" : "Kota apa",
        "province" : "Provinsi apa",
        "country" : "Negara apa",
        "postal_code" : "Kode pos"
    }
}
```

Response Error :

```json
{
    "errors" : "Contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headres :
- Authorization : token

Response Success :

```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "Jalan apa",
            "city" : "Kota apa",
            "province" : "Provinsi apa",
            "country" : "Negara apa",
            "postal_code" : "Kode pos"
        },
        {
            "id" : 2,
            "street" : "Jalan 2 apa",
            "city" : "Kota 2 apa",
            "province" : "Provinsi 2 apa",
            "country" : "Negara 2 apa",
            "postal_code" : "Kode 2 pos"
        }
    ]
}
```

Response Error :

```json
{
    "errors" : "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headres :
- Authorization : token

Response Success :

```json 
{
    "data" : "OK"
}
```

Response Error :

```json
{
    "errors" : "Contact not found"
}
```
