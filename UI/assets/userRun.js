let navBar=document.getElementById('navBar');
let headerLeft=document.getElementById('headerLeft');
let headerRight=document.getElementById('headerRight');
let aside=document.getElementById('aside');
let main=document.getElementById('main');
let asideDiv=document.getElementsByClassName('aside');
let modalBackground=document.getElementById('modalBackground');
let textArea= document.getElementById('campStatement');
let selectDivs=document.getElementsByTagName('select');


window.addEventListener('hashchange',()=>{
    window.scrollTo(0,window.scrollY-70);
})

for(i=0;i<selectDivs.length;i++){
    selectDivs[i].addEventListener('focus',(e)=>{
        let target=e.target;
        console.log(target.nextElementSibling)
        target.nextElementSibling.nextElementSibling.style.top='-87px';
        target.nextElementSibling.nextElementSibling.style.color= 'rgb(36, 138, 185)';
    })
}
for(i=0;i<selectDivs.length;i++){
    selectDivs[i].addEventListener('blur',(e)=>{
        let target=e.target;
        if(target.options[target.options.selectedIndex].value===""){
            target.nextElementSibling.nextElementSibling.style.top='-50px';
            target.nextElementSibling.nextElementSibling.style.color= 'black';
        }else{
            target.nextElementSibling.nextElementSibling.style.color= 'black';
        }
        
    })
}
textArea.addEventListener('focus',()=>{
    textArea.nextElementSibling.style.top='-168px';
    textArea.nextElementSibling.style.color='rgb(36, 138, 185)';
})
textArea.addEventListener('blur',()=>{
    if(textArea.value.trim()===""){
        textArea.nextElementSibling.style.top='-40px';
        textArea.nextElementSibling.style.color='black';
    }
    else{
        textArea.nextElementSibling.style.color='black';
    }
    
})
textArea.addEventListener('keydown',()=>{
    let maxLength=500;
    console.log(textArea.value.length)
    if(textArea.value.length>=maxLength){
        textArea.value=textArea.value.substr(0,maxLength);
        return false;
    }
})

window.addEventListener('scroll',()=>{    
       for(i=0;i<asideDiv.length;i++){
           asideDiv[i].style.top=window.pageYOffset+'px';
       }   
}) 

window.addEventListener('resize',()=>{
   if(window.innerWidth<=765){
      aside.style.marginLeft='-170px';
      headerLeft.style.marginLeft='-170px';
      main.style.flexBasis='100%';
      headerRight.style.flexBasis='100%';
      modalBackground.style.display='none';
   }
   if(window.innerWidth>765){
       aside.style.marginLeft='0px';
       headerLeft.style.marginLeft='0px';
       main.style.flexBasis='80%';
       headerRight.style.flexBasis='80%';
       modalBackground.style.display='none';
    }
})
modalBackground.addEventListener('click',()=>{
   aside.style.marginLeft='-170px';   
   headerLeft.style.marginLeft='-170px'; 
   modalBackground.style.display='none';
})
navBar.addEventListener('click',()=>{
   if(window.innerWidth>=766){
       
       if(window.getComputedStyle(aside).getPropertyValue('margin-left')==='0px'){
           let width=window.getComputedStyle(aside).getPropertyValue('width');
           main.style.flexBasis='100%';
           headerRight.style.flexBasis='100%';
           aside.style.marginLeft='-'+width;
           headerLeft.style.marginLeft='-'+width;
   
       }else{
           
           aside.style.marginLeft='0px';
           main.style.flexBasis='80%';
           headerLeft.style.marginLeft='0px';
           headerRight.style.flexBasis='80%';
       }
   }
   //response when screen is samller than Tablet
   if(window.innerWidth<766){
       
       if(window.getComputedStyle(aside).getPropertyValue('margin-left')==='-170px'){
           aside.style.marginLeft='0px';
           headerLeft.style.marginLeft='0px';
           modalBackground.style.display='block';
       }else{
           aside.style.marginLeft='-170px';   
           headerLeft.style.marginLeft='-170px'; 
           modalBackground.style.display='none';
       }
   }

})



