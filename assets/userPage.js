 let navBar=document.getElementById('navBar');
 let headerLeft=document.getElementById('headerLeft');
 let headerRight=document.getElementById('headerRight');
 let aside=document.getElementById('aside');
 let main=document.getElementById('main');
 let asideDiv=document.getElementsByClassName('aside');
 let modalBackground=document.getElementById('modalBackground');
let blueBoxLinks=document.getElementsByClassName('menu');
const candidateName = document.getElementById('candidateName');
const runningOffice = document.getElementById('runningOffice');
const party = document.getElementById('party');

for(i=0;i<blueBoxLinks.length;i++){
    if(i===0){
        blueBoxLinks[i].addEventListener('click',()=>{
            location='./userPageVote.html';
        })
    }
    else if(i===1){
        blueBoxLinks[i].addEventListener('click',()=>{
            location='./userRun.html';
        })
    }
    else if(i===2){
        blueBoxLinks[i].addEventListener('click',()=>{
            location='./userPageResults.html';
        })
    }
}

window.addEventListener('hashchange',()=>{
    window.scrollTo(0,window.scrollY-70);
})

window.addEventListener('scroll',()=>{    
        for(i=0;i<asideDiv.length;i++){
            asideDiv[i].style.top=window.pageYOffset+'px';
        }   
}) 
window.addEventListener('load',()=>{
    const userId = localStorage.getItem('user');
    //load in votes made by a user  
    const url = `https://politico2gilbert.herokuapp.com/api/v1/votes/${userId}`;
    const request = new Request (url, {
        method: 'GET',
        headers: new Headers ({'Content-type':'application/json', 'authorization': `${localStorage.getItem('auth')}`, 'Accept':'application/json,text/plain,*/*'}), 
    })
    fetch(request).then(res => {
        if(res.ok){
            return res.json();
        }
        throw res;
    }).then(obj => {
        obj.data.forEach(vote => {
            const url = `https://politico2gilbert.herokuapp.com/api/v1/candidate/${vote.candidate}`;
            const requestCandidate = new Request (url, {
                method: 'GET',
                headers: new Headers ({'Content-type':'application/json', 'authorization': `${localStorage.getItem('auth')}`, 'Accept':'application/json,text/plain,*/*'}), 
            });
            fetch(requestCandidate).then( res => {
                if(res.ok){
                    return res.json();
                }
                throw res;
            }).then( obj => {
                console.log(obj.data);
               /* runningOffice.textContent = obj.data.officetype;
                candidateName.textContent = `${obj.data.userFirstName} ${obj.data.userLastName}`;
                party.textContent = obj.data.partyName;*/
                // creating elems
                
                const office = document.createElement('div');
                office.className = 'office';
                const parent = document.getElementById('votePoliticalOffices');
                const candName = document.createElement('div');
                candName.className = 'candidateName';
                candName.textContent = `${obj.data.userFirstName} ${obj.data.userLastName}`;
                candName.setAttribute('id', 'candidateName');
                const runOffice = document.createElement('div');
                runOffice.className = 'runningOffice';
                runOffice.textContent = obj.data.officetype;
                runOffice.setAttribute('id', 'runningOffice');
                const party = document.createElement('span');
                party.setAttribute('id', 'party');
                party.textContent = obj.data.partyName;
                const statement = document.createElement('div');
                statement.className = 'statement';
                const unicode = document.createElement('div');
                unicode.className = 'fa';
                office.appendChild(candName);
                office.appendChild(party);
                office.appendChild(runOffice);
                office.appendChild(unicode);
                parent.appendChild(office);
                parent.appendChild(statement);
                // creating elems
                //getelements
                const statementArrows = document.getElementsByClassName('fa');
                const statementDiv = document.getElementsByClassName('statement');
                for(i=0;i<statementArrows.length;i++){
                    statementArrows[i].innerHTML='&#xf107;';
                } 
                    console.log(statementArrows);
                    unicode.addEventListener('click',(e)=>{
                        let target=e.target;
                        let realTarget=target.parentNode.nextElementSibling;
                        console.log(realTarget, ' ',target )
                        let state= window.getComputedStyle(realTarget).getPropertyValue('display');
                        if(state==='none'){
                            for(i=0;i<statementArrows.length;i++){
                                statementArrows[i].innerHTML='&#xf107;';
                                statementDiv[i].style.display='none';
                            }
                            target.innerHTML='&#xf106;';
                            realTarget.style.display='block';
                        }
                        else{
                            target.innerHTML='&#xf107;';
                            realTarget.style.display='none';
                        }
                
                    })
                
            }).catch(e => {
                if (e.message === 'Failed to fetch'){
                    console.log('check ur connection')
                } else {
                    e.json().then(err => {
                        console.log(err.message);
                    })
                }
            })
        });
    }).catch(e => {
        if (e.message === 'Failed to fetch'){
            console.log('check ur connection')
        } else{
            e.json().then(err => {
                console.log(err.message);
            })
        }
    })
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

 
 
