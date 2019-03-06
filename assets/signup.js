let headerCenterDiv=document.getElementById('headerCenterDiv');
let signinDiv=document.getElementById('signinDiv');
let modalBackground=document.getElementById('modalBackground');
let loginButton=document.getElementById('submitButton');
let closeX=document.getElementsByClassName('close');
let forgotPassword=document.getElementById('forgotPassword');
let loginName=document.getElementById('loginName');
let loginPassword=document.getElementById('loginPassword');
let submitSignup = document.getElementById('submitSignup');
let signupForm = document.forms['signupForm'];
const loadingBackground = document.getElementById('loadingBackground');
const ErrorMessageBackground = document.getElementById('ErrorMessageBackground');
const errMessage = document.getElementById('errMessage');
const closeErr = document.getElementById('closeErr');
const welcomeToPoliticoBackground = document.getElementById('welcomeToPoliticoBackground');
const welcomeRedirect = document.getElementById('welcomeRedirect');
const signedInUser = document.getElementById('signedInUser');
//signup implementation
welcomeRedirect.addEventListener('click', () => {
    location = './index.html';
})
closeErr.addEventListener('click', ()=> {
    ErrorMessageBackground.style.display = 'none';
})
submitSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loadingBackground.style.display = 'block';
    const url = 'https://politico2gilbert.herokuapp.com/api/v1/auth/signup';
    const signUser = {
        firstname: signupForm.elements['firstname'].value,
        lastname: signupForm.elements['lastname'].value,
        othername: signupForm.elements['othername'].value,
        userPassword: signupForm.elements['inputPassword'].value,
        email: signupForm.elements['email'].value,
        phoneNumber: signupForm.elements['phoneNumber'].value,
        passportUrl: signupForm.elements['passportUrl'].value
    }
    const request = new Request (url, {
        method: 'POST',
        headers: new Headers ({'Content-type':'application/json', 'Accept':'application/json,text/plain,*/*'}),
        body: JSON.stringify(signUser)
    })
    fetch(request).then((res) => {
        if (res.ok){
            return res;
        }
        throw res;
    }).then((res) => {
        return res.json();
    }).then((obj) => {
        console.log(obj.data);
        signedInUser.textContent = obj.data[0].user.firstname;
        welcomeToPoliticoBackground.style.display = 'flex';
        localStorage.setItem('auth', obj.data[0].token);
        loadingBackground.style.display = 'none';
    }).catch (e =>{
        ErrorMessageBackground.style.display = 'flex';
        loadingBackground.style.display = 'none';
        if (e.message === 'Failed to fetch'){
            errMessage.textContent = 'check your network connection';
            console.log('check your network connection')
        } else {
            e.json().then((eMessage) => {
              errMessage.textContent = eMessage.message;
              console.log(eMessage.message)  
            });
        }
    })
})
//end signup implementation
forgotPassword.addEventListener('click',()=>{
    document.getElementById('resetPasswordModalBackground').style.display='flex';
})

modalBackground.addEventListener('click',(e)=>{
    let target=e.target;
    console.log(target)
    //ensure loginForm is not closed when clicked on except the 
    //click happened on the modal directly
    if(target===modalBackground){
        //ensure the loginForm dosnt close when inputs are in the form
        if(loginName.value.trim()===""&&loginPassword.value.trim()===""){
            modalBackground.style.display='none';
            headerCenterDiv.style.backgroundColor='rgb(77, 68, 68)';
            headerCenterDiv.style.color='grey';
        
        }
        
    }
    
})


loginButton.addEventListener('click',(e)=>{
    e.preventDefault();
    location='./userPage.html';
})

headerCenterDiv.addEventListener('click',()=>{
    
    if(window.getComputedStyle(modalBackground).getPropertyValue('display')==='none'){
        if(window.innerWidth>=901){
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
        }else if(window.innerWidth<901 && window.innerWidth>450 ){
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=((headerCenterDiv.offsetLeft +130)-270)+'px';
        }else{
            modalBackground.style.display='block';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left='0px';
        }
    }else{
        modalBackground.style.display='none';
        headerCenterDiv.style.backgroundColor='rgb(77, 68, 68)';
        headerCenterDiv.style.color='grey';
    }

      
})

window.addEventListener('resize',()=>{
    if(window.getComputedStyle(modalBackground).getPropertyValue('display')!=='none'){
        if(window.innerWidth>=901){
    
            document.getElementById('modalContent').style.left=headerCenterDiv.offsetLeft+'px';
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            
        }
        else if(window.innerWidth<901 && window.innerWidth>450 ){
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left=((headerCenterDiv.offsetLeft +130)-270)+'px';
        }else{
            headerCenterDiv.style.backgroundColor='white';
            headerCenterDiv.style.color='black';
            document.getElementById('modalContent').style.left='0px';
        }
    
}   
    
})