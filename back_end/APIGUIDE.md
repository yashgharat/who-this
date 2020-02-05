# API Documentation

## Below is a list of all of the API calls and their required JSON.

#### 1. Create user
This API call creates a new user.
```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/create-user
```
Required JSON:
```
{
   "UID":""   
}
```

#### 2. Create contact 
This API call returns all contacts for a given user.
```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/create-contact
```
Required JSON:
```
{
   "user":"",
   "contact_name":"",
   "contact_number":"",
   "contact_email":""    
}
```

#### 3. Read all contacts
This API call returns all contacts for a given user.
```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/read/:user
```
Required JSON:
None

#### 4. Delete contact
This API call deletes a specified contact.
```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/delete
```
Required JSON:
```
{
   "user":"",
   "contact_name":"" 
}
```

#### 5. Update contact name
This API call updates the name of a specified contact.

```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/update-name
```
Required JSON:
```
{
   "user":"",
   "old_name":"",
   "new_name":""  
}
```

#### 6. Update contact number
This API call updates the number of a specified contact.

```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/update-number
```
Required JSON:
```
{
   "user":"",
   "old_number":"",
   "new_number":""  
}
```

#### 5. Update contact email
This API call updates the email of a specified contact.

```
https://us-central1-whothis-1599c.cloudfunctions.net/app/api/update-email
```
Required JSON:
```
{
   "user":"",
   "old_email":"",
   "new_email":""  
}
```