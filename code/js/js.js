// UABC | ejAmerica
// 10-05-2020
// Emmanuel Nuno Estrella
// CRUD for user management 

// USER  CONTROLLER
var userController = (function(){

    var User = function(id, name, age, relocation,phone, email){
        this.id = id
        this.name = name;
        this.age = age;
        this.relocation = relocation;
        this.phone = phone;
        this.email = email;

    }

    var data = {
      users:[]
    }
    User.prototype.getName = function() {
        return this.name;
    };

    User.prototype.getAge = function(){
        return this.age;
    }
    
    User.prototype.getEmail = function(){
        return this.email;
    }

    // generate random integer
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    // generate random word for name
    var randomWord = function(letters,except, plus){
        var i,word,a,z
        a=97
        z=122
        i=0
        word=""

        var randChar = String.fromCharCode(randInt); 
        // setup exceptions
        var exeptions =  except // example'[^*aoump""]'

       while (i < letters && word.length < letters ) {

        // select random int
        var randInt = getRandomInt(a,z);
        // convert int to char
        var randChar = String.fromCharCode(randInt); 
        // setup regular expresion
        let reEx= new RegExp(exeptions)
        // evaluate regular expresion
        let result = reEx.test(randChar)
        // word builder after passing exceptions/RegExp
            if( result )
             {
                 word+=randChar;
                 i++
             }
  
        }
        if(plus)
        {
            randInt= getRandomInt(1,9)
            word+=randInt
        }
      

        return word;
    
    }

    // random User
    var randomUser = function(ID){
            var randomInt, rndAge, relocation, 
                phone, email, usr,exception,
                word1, word2, word3, word4, name
            // generate random name.
                exception = '[^aoump]'
                word1 = randomWord(4,exception,false);
                exception = '[asdfghjklopuytem]'
                word2 = randomWord(4,exception,false);
                exception = '[^aeou]'
                word3 = randomWord(4,exception,true);
                exception = '[a-z]'
                word4 = randomWord(3,exception,false);
                word4 +="t"
                name = word1+" "+ word2+" "+ word3+" "+word4
            // generate random age.
                rndAge = getRandomInt(18,46);
            // identify relocation.
                relocation = true
            // generate random phone.
                phone = randomPhone();
                formatedPhone =  phoneFormat(phone)
                console.log(formatedPhone)
            // generate random email.
                email=""
                randomInt = getRandomInt(4,21)
                exception = "[a-z]"
                email = randomWord(randomInt,exception,false)
                email += "@"
                exception ="[^.]"
                randomInt = getRandomInt(5,11)
                email += randomWord(randomInt,exception,false)
                email += "."
                exception = "[^.-_+]"
                randomInt = getRandomInt(2,4)
                email += randomWord(randomInt,exception,false)

            usr = new User(ID,name,rndAge,relocation, phone, email);

        return usr;
    }

    // generate random phone
    var randomPhone = function(){
        var phoneString,i 
        phoneString=0
        i=1
        while ( i < 11){
            var randInt = getRandomInt(1,10)
            phoneString+=randInt.toString();
            i++
        }
        return phone = parseInt(phoneString,10);
    }
    // display formated phone
    var phoneFormat = function(number){
        var phoneString
        phoneString = number.toString()
        return phoneString.replace(/(\d{1})(\d{3})(\d{2})(\d{2})(\d{2})/, "+$1 ($2) $3 $4 $5");
    }

    // edit user
    // delete user
    // delete all

    // testing
    var add = function(a){
        var x = 5;
        return x + a;
    }

    return {
        // add a new user tor data strutcture
        addNewUser: function(type, name, age, relocation, phone, email){
            var newUser, ID
            ID =data.users.length
            console.log(ID)
            if(type === "random"){
                newUser = randomUser(ID);
            }else if( type === "input"){
                newUser = new User(ID,name,age,relocation,phone,email);
            }

            data.users.push(newUser);

            return newUser;
        },
        // get all data from users
        getData: function(){
            return data.users; // TODO: return only specific information
        },
        clearData:function(){
            data.users=[]
            return console.log("All data was cleared succesfully "+ data);

        },
        // test for module
        publicTest : function(){
            return randomUser();
        }

    }



})();


// UICONTROLLER
var UIController = (function(){

    var DOMstrings ={
    inputName :'.input__name',
    inputAge :'.input__age',
    inputPhone :'.input__phone',
    inputEmail :'.input__email',
    inputSaveButton :'.save__button',
    usersContainer:'.user__list',
    randomUser: '.randomUser__button',
    clearButton: '.clear__button',
    displayButton:'.display__button',
    }


    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };



            
    return {
        getInput: function() {
            return{
                name : document.querySelector(DOMstrings.inputName).value,
                age   : document.querySelector(DOMstrings.inputAge).value,
                phone : document.querySelector(DOMstrings.inputPhone).value,
                email : document.querySelector(DOMstrings.inputEmail).value
            };

        },
        getDOMstrings: function(){
            return DOMstrings
        },
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll( DOMstrings.inputName+', '+DOMstrings.inputAge + ', '+  DOMstrings.inputPhone  +', '+ DOMstrings.inputEmail);
            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function(current, index, array) {
                 current.value=""
            
            fieldsArr[0].focus()
                 
             });
        },

        validPhone:function(){


        },

        validName: function(){
            return true

        },

        validEmail: function(){
            let isVlid,input
            input = this.getInput();


        },
        validAge:function(){ 
            let input = this.getInput()
            var result = /[1-4][0-9]^""/.test(input.age);
            console.log("valid age result:"+result)
            return result;
        },

        addListItem:function(obj){
            var html, newHtml, element
            //HTML With placeholder text
            element = DOMstrings.usersContainer
            html = '<tr><th scope="row">%id%</th><td>%name%</td><td>%phone%</td><td>%email%</td></tr>';
            console.log("object phone:"+obj.phone)
            // replace the place holder text with actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%name%',obj.name);
            newHtml = newHtml.replace('%phone%',obj.phone);
            newHtml = newHtml.replace('%email%',obj.email);

            
            // insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml) 

        },
 
        validations: function(){
            var validPhone, validName, validAge
            // init values
            validAge=false
            validName=false
            validAge= false

         //   validPhone = this.validPhone();
            validName = this.validName()
            validAge = this.validAge();
          //  console.log("valid age= " + validAge)
            console.log("valid Name= " + validName)

         return validPhone && validName && validAge;
        }
    }



})();

// MAIN APP
var controller = (function(userCtrl, UICtrl)
{
    

    var ctrlAddUser = function(){
        var input, newUser,name
        // 1. Get the fields input data
        input = UICtrl.getInput();


        if( UICtrl.validations() !== false ) {

            // 2. Add the item to the user controller
            newUser = userCtrl.addNewUser("input",input.name, input.age,true,input.phone,input.email )

            // 3. Add the item to the UI
            UICtrl.addListItem(newUser);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. update user list
            //  updateUsersList();
        }       

    }

    ctrlRandomUser = function( obj){
        var newUser,

        newUser = userCtrl.addNewUser("random")
        console.log(newUser)
        UICtrl.addListItem(newUser)

    }

    var displayUsers = function(){
            return console.log(userCtrl.getData())
    }

    var clearUsers = function(){
        return userCtrl.clearData()
    }

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        // random user button
        document.querySelector(DOM.inputSaveButton).addEventListener('click',ctrlAddUser)
        // save change from input user button
        document.querySelector(DOM.randomUser).addEventListener('click',ctrlRandomUser)
        // display users in the console
        document.querySelector(DOM.displayButton).addEventListener('click',displayUsers)
        // delete all users
        document.querySelector(DOM.clearButton).addEventListener('click',clearUsers)


    }

    var updateUsersList = function(){
        var user = userCtrl.getUsers()
        UICtrl.displayList(users)
    }


    return{

        init: function(){
            console.log("Aplication has started");
            setupEventListeners()

            
        }
    }

})(userController,UIController);

controller.init();
