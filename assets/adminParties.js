let navBar=document.getElementById('navBar');
let headerLeft=document.getElementById('headerLeft');
let headerRight=document.getElementById('headerRight');
let aside=document.getElementById('aside');
let main=document.getElementById('main');
let asideDiv=document.getElementsByClassName('aside');
let modalBackground=document.getElementById('modalBackground');
let editModalBackground=document.getElementById('editModalBackground');
let officeModalBackground=document.getElementById('officeModalBackground');
let statementArrows=document.getElementsByClassName('fa');
let buttonDiv=document.getElementsByClassName('buttonDiv');
let editButtons=document.getElementsByClassName('edit');
let createButton=document.getElementById('create');
let closeX=document.getElementsByClassName('close');


for(i=0;i<closeX.length;i++){
    closeX[i].addEventListener('click',()=>{
        editModalBackground.style.display='none';
        officeModalBackground.style.display='none';

    })
}

for(i=0;i<editButtons.length;i++){
    editButtons[i].addEventListener('click',()=>{
        editModalBackground.style.display='flex';

    })
}

createButton.addEventListener('click',()=>{
    officeModalBackground.style.display='flex';
})
window.addEventListener('scroll',()=>{    
       for(i=0;i<asideDiv.length;i++){
           asideDiv[i].style.top=window.pageYOffset+'px';
       }   
}) 
for(i=0;i<statementArrows.length;i++){
    statementArrows[i].addEventListener('click',(e)=>{
        let target=e.target;
        let realTarget=target.parentNode.nextElementSibling;
        let state= window.getComputedStyle(realTarget).getPropertyValue('display');
        if(state==='none'){
            for(i=0;i<statementArrows.length;i++){
                statementArrows[i].innerHTML='&#xf107;';
                buttonDiv[i].style.display='none';
            }
            target.innerHTML='&#xf106;';
            realTarget.style.display='block';
        }
        else{
            target.innerHTML='&#xf107;';
            realTarget.style.display='none';
        }

    })
}
window.addEventListener('load',()=>{
    for(i=0;i<statementArrows.length;i++){
        statementArrows[i].innerHTML='&#xf107;';    
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



