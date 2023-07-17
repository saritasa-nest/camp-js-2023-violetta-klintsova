var h=Object.defineProperty;var y=(t,e,s)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(y(t,typeof e!="symbol"?e+"":e,s),s);import"./modulepreload-polyfill-3cfb730f.js";class i{constructor(){r(this,"subscribers",[])}subscribe(e){this.subscribers.includes(e)||this.subscribers.push(e)}unsubscribe(e){const s=this.subscribers.indexOf(e);s!==-1&&this.subscribers.splice(s,1)}notify(e){for(const s of this.subscribers)s.update(e)}}class p extends i{constructor(s){super();r(this,"currentPlayerIndex",0);this.playersCount=s}next(){this.notify(this.currentPlayerIndex),this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.playersCount}}class m extends i{constructor(e){super(),this.maxSides=e}getRandomNumber(e){return Math.floor(Math.random()*e)}update(e){const s={playerIndex:e,diceResult:this.getRandomNumber(this.maxSides)};this.notify(s)}}class u extends i{constructor(s){super();r(this,"diceResults",[]);r(this,"diceSum",0);r(this,"winStatus",!1);r(this,"winNumber",21);this.playerIndex=s}update(s){this.playerIndex===s.playerIndex&&(this.diceResults.push(s.diceResult),this.diceSum+=s.diceResult,this.diceSum>=this.winNumber&&(this.winStatus=!0),this.notify(this))}}class l{constructor(e){this.element=e}update(e){const s=this.element;s.innerHTML+=`${e.diceResults.at(-1)} `,e.winStatus&&(s.style.backgroundColor="pink")}}class x extends i{constructor(){super(...arguments);r(this,"allDiceNumbers",[])}update(s){this.allDiceNumbers.push(s.diceResult),this.notify(this.allDiceNumbers)}}class f{constructor(e){this.element=e}update(e){const s=this.element;s.innerHTML+=`${e.at(-1)} `}}const a=new p(2),n=new m(7);a.subscribe(n);const o=new u(0),d=new u(1);n.subscribe(o);n.subscribe(d);const S=new l(document.querySelector(".display-0"));o.subscribe(S);const w=new l(document.querySelector(".display-1"));d.subscribe(w);const b=new x;n.subscribe(b);const R=new f(document.querySelector(".accumulator-display"));b.subscribe(R);const c=document.querySelector(".roll-dice-button");c==null||c.addEventListener("click",()=>{a.next()});
