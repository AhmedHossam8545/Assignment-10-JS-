


var show_user=document.getElementById("username")


var sign_button=document.getElementById("sign-in")


var signUp_button=document.getElementById("sign-up")


let  my_users = JSON.parse(window.localStorage.getItem('users')) || [];


var logOut_button=document.getElementById("logout")


if(show_user!=null){

    var name=JSON.parse(window.localStorage.getItem('current_user')).name

    show_user.innerHTML=show_user.innerHTML+name;
}





if(logOut_button!=null){

    logOut_button.onclick=function(){


        window.localStorage.removeItem("current_user");

        window.location.href="index.html"
    }
}



function email_exists(email){

    for(var i=0 ; i<my_users.length ; ++i){

        if(my_users[i].email==email)
            return true;


    }
    return false;
}

function pass_exits(pass){

    for(var i=0 ; i<my_users.length ; ++i){

        if(my_users[i].password==pass)
            return true;


    }
    return false;
}



if(signUp_button!=null){

    signUp_button.onclick=function(){
    
    
    
        var username=document.getElementById("name").value
        var email=document.getElementById("email").value
        var password=document.getElementById("password").value
    
    
    
    
        var error_text=document.getElementById("error")
    
    
        if(username.trim()=="" || email.trim()=="" || password.trim()==""){
    
          
            error_text.innerHTML="All Inputs is required";
            error_text.style.color="red"
    
            setTimeout(() => {
                error_text.innerHTML="";
            }, 5000);
        }
    
    
        else if(email_exists(email)){
    
            error_text.innerHTML="email already exists";
            error_text.style.color="red"
    
            setTimeout(() => {
                error_text.innerHTML="";
            }, 5000);
        }
    
        
    
    
        else{
    
    
            var user={
                name:username,
                password:password,
                email:email,
            }
    
            my_users.push(user)
    
            window.localStorage.setItem("users",JSON.stringify(my_users))

            

            error_text.innerHTML="Success";
            error_text.style.color="green"


            setTimeout(function(){

                window.location.href="index.html"
            },1000)

    
        }
    
    
    
    
    }
}


if(sign_button!=null){

    sign_button.onclick=function(){
    
    
    
        
        var email=document.getElementById("email").value
        var password=document.getElementById("password").value
    
    
    
    
        var error_text=document.getElementById("error")
    
    
        if( email.trim()=="" || password.trim()==""){
    
            
            error_text.innerHTML="All Inputs is required";
            error_text.style.color="red"
    
            setTimeout(() => {
                error_text.innerHTML="";
            }, 5000);
        }
    
    
        else if(email_exists(email)==false || pass_exits(password)==false){
    
            error_text.innerHTML="Incorrect Email Or Password";
            error_text.style.color="red"
    
            setTimeout(() => {
                error_text.innerHTML="";
            }, 5000);
        }
    
        
    
    
        else{

          

            var username="";


            for(var i=0 ; i<my_users.length ; ++i){

                if(my_users[i].password==password && my_users[i].email==email ){

                    username=my_users[i].name;
                    break;
                }
                    
        
            }
    
    
            var user={
                name:username,
                password:password,
                email:email,
            }
    
          
    
            window.localStorage.setItem("current_user",JSON.stringify(user))


            error_text.innerHTML="Success";
            error_text.style.color="green"

            setTimeout(function(){

                window.location.href="home.html"
            },1000)
    
       
        }
    
    
    
    
    }
}


var food=["carrot","broccoli","cake","fries","chicken","ice cream","watermelon","pie","chocolate","duck",
    "crab","beef","toast","seafood","mango","lemon","avocado","red pepper","garlic","blueberry","pasta","popcorn"
]




let food_header=document.getElementById("food-type")



if(food_header!=null){


    function display(){

        var arr=[]
        let i=  Math.floor((Math.random() * food.length-1) + 1);
            
         
        food_header.innerHTML=food[i]
    
    
    
    var httpreq=new XMLHttpRequest()
    
    
    
    
    httpreq.open("get","https://forkify-api.herokuapp.com/api/search?q="+food[i])
    
    
    
    
    httpreq.send()
    
    
    
    
    
    httpreq.addEventListener("readystatechange",function(){
    
    if(httpreq.readyState==4){
    
    
        arr=JSON.parse(httpreq.response).recipes
    
    
       
       
        
    
    
        var cartonnaa=` `
    
    
        var food_container=document.getElementById("food-container")
        
        if(food_container!==null){
    
            
                    for(var i=0 ; i<arr.length ; ++i){
            
                        cartonnaa=cartonnaa+`
            
                        <div class="card col-3  " >
                        <img src="${arr[i].image_url}" class="card-img-top" alt="${food[i]} image"}">
                        <div class="card-body">
                          <p class="card-text"><spna class="fw-bolder">Title : </spna>${arr[i].title}</p>
                        </div>
                      </div>
                        `
                    }
            
                    food_container.innerHTML=cartonnaa
        }
    
    }
    })
    
    
    }


    display();

    setInterval(function(){

        display()
        
    },5000)

}    


