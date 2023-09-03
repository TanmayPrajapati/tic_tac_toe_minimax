let state = new Array(9);

function utility(state){
    let p1 = state.map((element)=>{
        return element==="X";
    })
    let p2 = state.map((element)=>{  //for ai
        return element==="O";
    })
    let u;
    if((p1[0] && p1[1] && p1[2]) || (p1[3] && p1[4] && p1[5]) || (p1[6] && p1[7] && p1[8]) || (p1[0] && p1[3] && p1[6]) || (p1[1] && p1[4] && p1[7]) || (p1[2] && p1[5] && p1[8]) || (p1[0] && p1[4] && p1[8]) || (p1[2] && p1[4] && p1[6])){
		u = 1;
	}
    if((p2[0] && p2[1] && p2[2]) || (p2[3] && p2[4] && p2[5]) || (p2[6] && p2[7] && p2[8]) || (p2[0] && p2[3] && p2[6]) || (p2[1] && p2[4] && p2[7]) || (p2[2] && p2[5] && p2[8]) || (p2[0] && p2[4] && p2[8]) || (p2[2] && p2[4] && p2[6])){
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
            t.push(index);
        }  
    }
    return t;
}

function terminal(currstate){
    for(e of currstate){
        if(e===undefined) return false;
    }
    return true;
}
function result(action , currstate, p){
    let arr = []
    currstate.forEach(e=>arr.push(e));
    return arr;
}
let t;
function min_ai(currstate){
    if(terminal(currstate)){
        return utility(currstate);
    }
    let v = 1000;
    let acc;
    let a = actions(currstate);
    for(action of a){
        temp = max(result(action,currstate,"O"));
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
        return utility(currstate);
    }
    let v = -1000;
    let a = actions(currstate);
    for(action of a){
        v = Math.max(v,min_ai(result(action, currstate, "X"))[0]);
    }
    return v;
}

// state = ["O", "X", undefined, "X", "O", "O", "X","X",undefined];
// console.log(min_ai(state),t);

function terminate(state){
    if(terminal(state)){
        let u = utility(state);
        if(u==0){
            alert("draw");
        }
        else if(u==1){
            alert("YOu win");
        }
        else{
            alert("you lose ai win");
        }
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
    terminate(state);
    state[t]="O";
}