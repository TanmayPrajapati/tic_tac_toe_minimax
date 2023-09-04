let state = new Array(9);

function utility(state){
    let p1 = state.map((element)=>{
        return element==="X";
    })
    let p2 = state.map((element)=>{  //for ai
        return element==="O";
    })
    // console.log(p1);
    let u;
    if((p1[0] && p1[1] && p1[2]) || (p1[3] && p1[4] && p1[5]) || (p1[6] && p1[7] && p1[8]) || (p1[0] && p1[3] && p1[6]) || (p1[1] && p1[4] && p1[7]) || (p1[2] && p1[5] && p1[8]) || (p1[0] && p1[4] && p1[8]) || (p1[2] && p1[4] && p1[6])){
		u = 1;
	}
    else if((p2[0] && p2[1] && p2[2]) || (p2[3] && p2[4] && p2[5]) || (p2[6] && p2[7] && p2[8]) || (p2[0] && p2[3] && p2[6]) || (p2[1] && p2[4] && p2[7]) || (p2[2] && p2[5] && p2[8]) || (p2[0] && p2[4] && p2[8]) || (p2[2] && p2[4] && p2[6])){
		u = -1;
	}
    else u=0;
    console.log(u);
    return u;
}

function actions(currentState){
    let t=[];

    for(i=0; i< currentState.length; i++) {
        if(currentState[i] === undefined) {
            t.push(i);
        }  
    }
    return t;
}

function terminal(currstate){
    let u = utility(currstate);
    if(u==1 || u==-1){
        return true;
    }
    for(e of currstate){
        if(e===undefined) return false;
    }
    return true;
}
function result(action , currstate, p){
    let arr = []
    for(let i=0;i<9;i++){
        arr.push(currstate[i]);
    }
    arr[action]=p;
    return arr;
}

function min_ai(currstate){
    if(terminal(currstate)){
        return [utility(currstate),0];
    }
    let v = 1000;
    let acc;
    let a = actions(currstate);
    for(action of a){
        let temp = max(result(action,currstate,"O"));
        // console.log(temp);
        if(temp<v){
            v = temp;
            acc = action;
        }
    }
    t = acc;
    return [v,acc];
}
function max(currstate){
    if(terminal(currstate)){
        // let u = utility(currstate);
        // console.log(u);
        return utility(currstate);
    }
    let v = -1000;
    let a = actions(currstate);
    for(action of a){
        v = Math.max(v,min_ai(result(action, currstate, "X"))[0]);
    }
    return v;
}

state = ["O", "X", undefined, "X", "O", "O", "X","X",undefined];
console.log(min_ai(state));

function terminate(currstate){
        let u = utility(currstate);

        if(u==1){
            alert("YOu win");
            location.reload();
        }
        else if(u==-1){
            alert("THe AI win");
            location.reload();
        }
        else if(terminal(state)){
            alert("you lose ai win");
            location.reload();
        }
        
}

function selectBox(id){
    document.getElementById(id).innerHTML = "X";
    id = Number(id);
    state[id]="X";
    terminate(state);
    t=min_ai(state);
    console.log(t);
    document.getElementById(t[1].toString()).innerHTML = "O";
    state[t[1]]="O";
    terminate(state);
    
}
