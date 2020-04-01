# Api documentation

## 1. Job

#### Add Job
Adding a new job.

* URL
  /api/job/

* Method
  POST

* URL Params
  None

* Data 
  Required
  ```
  employer_id: String, 
  title: String, 
  description: String, 
  requirement: String, 
  location: String, 
  type: String, 
  category: String, 
  salary: String, 
  duration: String  
  ```

  Optional
  ```
  imageUrl: String, 
  public_id: String
  ```

* Middleware
  auth

* Success Response
  * Code: 200  
    Content: ``` {employer_id, title, description, requirement, location, type, category, salary, duration, imageUrl, public_id} ```
   
* Error Response 
  * Code: 401 Unauthorized
    Content: ``` {msg: 'Token is not valid'} ```

* Sample Call
  ```javascript
   axios
        .post('/api/job', item, {headers: {"Authorization": YOUR_JWT_TOKEN}})                
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
  ```

#### Upload Image 
Upload image if there is any image in new job.

* URL
  /api/job/upload

* Method
  POST

* URL Params
  None

* Data 
  Required
  ```
  image: File
  ```

* Middleware
  auth, upload.single("image")

* Success Response
  * Code: 200  
    Content: ``` {_id, imageUrl, public_id} ```
   
* Error Response 
  * Code: 400 Bad request
    Content: ``` {msg: "File not uploaded"} ```
    
  * Code: 401 Unauthorized
    Content: ``` {msg: 'Token is not valid'} ```  

* Sample Call
  ```javascript
   axios
        .post('/api/job/upload', formData, {headers: {"Authorization": YOUR_JWT_TOKEN}})                
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
  ```

#### Display Jobs 
Display all jobs.

* URL
  /api/job/displayjobs

* Method
  GET

* URL Params
  None

* Middleware
  None

* Success Response
  * Code: 200  
    Content: ``` {employer_id, title, description, requirement, location, type, category, salary, duration, imageUrl, public_id} ```
   
* Error Response 
  * Code: 400 Bad Request
    Content: ``` {msg: "No result found"} ```

* Sample Call
  ```javascript
   axios
        .get('/api/job/displayjobs')    
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```

#### Add category
Adding a new job category

* URL
  /api/job/addCategory

* Method
  POST

* URL Params
  None

* Data 
  Required:
  ```
  name: String
  ```

* Middleware
  None, but will be added with auth middleware

* Success Response
  * Code: 200  
    Content: ``` {name} ```
   
* Error Response 
  None, but will be added after adding auth middleware

* Sample Call
  ```javascript
   axios
        .post('/api/job/addCategory', {name: "Science and Tech"}, {headers: {"Authorization": YOUR_JWT_TOKEN}})
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```

#### Display Category
Display all categories

* URL
  /api/job/getCategory

* Method
  GET

* URL Params
  None

* Data 
  None

* Middleware
  None

* Success Response
  * Code: 200  
    Content: ``` {categories} ```
   
* Error Response 
  * Code: 400 Bad Request
    Content: ``` {msg: "Ops, something went wrong"} ```

* Sample Call
  ```javascript
   axios
        .get('/api/job/getCategory')
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```

## 2. User/Authentication

#### Login

* URL
  /api/user/login

* Method
  POST

* URL Params
  None

* Data 
  Required:
  ```
  email: String,
  password: String
  ```

* Middleware
  None

* Success Response
  * Code: 200  
    Content: ``` {User, JWT_TOKEN} ```
   
* Error Response 
  * Code: 400 Bad Request
    Content: ``` {msg: "No account found"} || {msg: "Password is incorrect"} ```

* Sample Call
  ```javascript
   axios
        .post('/api/user/login')
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```

#### Register

* URL
  /api/user/register

* Method
  POST

* URL Params
  None

* Data 
  Required:
  ```
  name: String,
  email: String,
  password: String,
  userType: String
  ```

* Middleware
  None

* Success Response
  * Code: 200  
    Content: ``` {user} ```
   
* Error Response 
  * Code: 400 Bad Request
    Content: ``` {msg: "Email has been registered"} || {msg: "Something went wrong, please try again."} ```

* Sample Call
  ```javascript
   axios
        .post('/api/user/register')
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```

## 3. Profile

#### Display Profile

* URL
  /api/profile/displayprofile/:_id

* Method
  GET

* URL Params
  Required:
  ```
  id: String
  ```

* Data 
  None

* Middleware
  None

* Success Response
  * Code: 200  
    Content: ``` {profile} ```
   
* Error Response 
  * Code: 400 Bad Request
    Content: ``` {msg: "Something went wrong. Please try again"} ```

* Sample Call
  ```javascript
   axios
        .get('/api/job/displayprofile/"THIS_IS_ID"')
        .then(res => console.log(res.data))            
        .catch(err => console.log(err))
  ```