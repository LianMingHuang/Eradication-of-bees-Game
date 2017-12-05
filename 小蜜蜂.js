window.onload=function(){
	var oBtn=document.getElementById('gameBtn')
	oBtn.onclick=function(){
		this.style.display='none'

		Game.init('div1')//游戏GOGO
	}
}

var Game={
   
     oEnemy:{//敌人的数据
         e1:{style:'enemy1',blood:1,speed:3,score:1},
         e2:{style:'enemy2',blood:2,speed:5,score:2},
         e3:{style:'enemy3',blood:3,speed:7,score:3},
     },
     gk:[//第一关的数据
          {
          	eMap:[
              'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
              'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
              'e2','e2','e2','e2','e2','e2','e2','e2','e2','e2',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
          	],
          	colNum:10,
          	iSpeedX:10,
          	iSpeedY:10,
          	times:2000
          } ,
                    {
          	eMap:[
              'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
              'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
              'e3','e3','e3','e3','e3','e3','e3','e3','e3','e3',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
              'e1','e1','e1','e1','e1','e1','e1','e1','e1','e1',
          	],
          	colNum:10,
          	iSpeedX:10,
          	iSpeedY:10,
          	times:2000
          } ,
     ],

     air: {//飞机的数据
         style:'air1',
         bulletStyle:'bullet'
     },

	init:function(id){ //游戏初始化
	  this.oParent=document.getElementById(id);

	  this.createScore();

	  this.createEnemy(0);

	  this.createAir()
	},

	createScore:function(){//积分创建
       var oS=document.createElement('div');
       oS.id='score';
       oS.innerHTML='积分:<span>0</span>';
       this.oParent.appendChild(oS);

       this.oSNum=oS.getElementsByTagName('span')[0];/*获取分数*/
	},
   createEnemy:function(iNow){//敌人的创建
      var gk=this.gk[iNow];
      var arr=[];
      var oUl=document.createElement('ul')
      if(this.oUl){
           clearInterval(this.oUl.timer);
           this.oParent.removeChild(this.oUl);
      }

      document.title='第'+(iNow+1)+'关';
      oUl.id='bee'
      oUl.style.width=gk.colNum*40+'px'
      this.oParent.appendChild(oUl)
      oUl.style.left=(this.oParent.offsetWidth-oUl.offsetWidth)/2+'px';
      this.oUl=oUl

      for(var i=0;i<gk.eMap.length;i++){
      	var oLi=document.createElement('li')
      	oLi.className=this.oEnemy[gk.eMap[i]].style

      	oLi.blood=this.oEnemy[gk.eMap[i]].blood;
      	oLi.speed=this.oEnemy[gk.eMap[i]].speed;
      	oLi.score=this.oEnemy[gk.eMap[i]].score;
      	oUl.appendChild(oLi)
      }
      this.aLi=oUl.getElementsByTagName('li')
      
       for(var i=0;i<this.aLi.length;i++){
        arr.push([ this.aLi[i].offsetLeft,this.aLi[i].offsetTop ])
       }
       for(var i=0;i<this.aLi.length;i++){
        this.aLi[i].style.position='absolute';
        this.aLi[i].style.left=arr[i][0]+'px';
        this.aLi[i].style.top=arr[i][1]+'px';
       }
      this.runEnemy(gk)
   },
    runEnemy:function(gk){//移动敌人
      var This=this;
      var L=0;
      var R=this.oParent.offsetWidth-this.oUl.offsetWidth;
      this.oUl.timer=setInterval(function(){
      	if(This.oUl.offsetLeft>R){
      		gk.iSpeedX *=-1;
      		 This.oUl.style.top=This.oUl.offsetTop+gk.iSpeedY+'px'
      	}else if(This.oUl.offsetLeft<L){
      		gk.iSpeedX *=-1;
      		This.oUl.style.top=This.oUl.offsetTop+gk.iSpeedY+'px'
      	}
      This.oUl.style.left=This.oUl.offsetLeft+gk.iSpeedX+'px'
      },200);
        
         setInterval(function(){
          
          This.oneMove();

         },gk.times);

    },

    oneMove : function() {//单兵作战

      var nowLi=this.aLi[ Math.floor(Math.random()*this.aLi.length) ];
      var This=this;
      nowLi.timer=setInterval(function(){
          var a=(This.oA.offsetLeft+This.oA.offsetWidth/2)-
          (nowLi.offsetLeft+nowLi.parentNode.offsetLeft+This.oA.offsetWidth/2);
          var b=(This.oA.offsetTop+This.oA.offsetHeight/2)-
          (nowLi.offsetTop+nowLi.parentNode.offsetTop+This.oA.offsetHeight/2);
          var c=Math.sqrt(a*a + b*b);
          var iSX=nowLi.speed * a/c;
          var iSY=nowLi.speed * b/c;

          nowLi.style.left=nowLi.offsetLeft +iSX+ 'px';
          nowLi.style.top=nowLi.offsetTop +iSY+ 'px';

          if(This.pz(This.oA,nowLi)){
            alert('游戏结束');
            window.location.reload();
          }
      },30)
    },
       
     createAir:function(){//飞机的创建
       var oA=document.createElement('div')
       oA.className=this.air.style;

       this.oA=oA

       this.oParent.appendChild(oA)
       oA.style.left=(this.oParent.offsetWidth-oA.offsetWidth)/2+'px'
       oA.style.top=(this.oParent.offsetHeight-oA.offsetHeight)+'px'
    

       this.bindAir();   
    },
         bindAir:function(){//操作飞机
         	var timer=null
         	var iNum=0
            var This=this
         document.onkeydown=function(ev){
         	var ev=ev||window.event;
            if(!timer){
            	timer=setInterval(show,30)
            }

         	if(ev.keyCode==37){
             iNum=1
         	}
         	else if(ev.keyCode==39){
         		iNum=2
         	}
         };
            
          document.onkeyup=function(){
          	   var ev=ev||window.event
               clearInterval(timer);//清除按键连续走动
               timer=null;
               iNum=0;

               if(ev.keyCode==32){
                   This.createBullet()
               }
          }; 

         function show(){
            if(iNum==1){
            This.oA.style.left=This.oA.offsetLeft-10+'px' 
           
            }else if(iNum==2){
              
            This.oA.style.left=This.oA.offsetLeft+10+'px' 
            }
         }
       },
      
      createBullet:function(){//子弹的创建
       var oB=document.createElement('div')
       oB.className=this.air.bulletStyle;
       this.oParent.appendChild(oB)
       oB.style.left=this.oA.offsetLeft+this.oA.offsetWidth/2+'px';
        oB.style.top=this.oA.offsetTop-10+'px';

        this.runBullet(oB)
      },

      runBullet:function(oB){//子弹的运动
        var This=this;
        oB.timer=setInterval(function(){
          if(oB.offsetTop<-10){
            clearInterval(oB.timer);
            This.oParent.removeChild(oB);
          }else{
            oB.style.top=oB.offsetTop-10+'px'
          }
          for(var i=0;i<This.aLi.length;i++){
            if(This.pz(oB,This.aLi[i])){
               
               if(This.aLi[i].blood==1){

                  clearInterval(This.aLi[i].timer);
                  
                  This.oSNum.innerHTML=parseInt(This.oSNum.innerHTML)+This.aLi[i].score
                  This.oUl.removeChild(This.aLi[i])

               }else{
                 This.aLi[i].blood--;
               }
              clearInterval(oB.timer)
              This.oParent.removeChild(oB)
            }
          }
          if(!This.aLi.length){
            This.createEnemy(1)

          }

        },30);
      },
      pz:function(obj1,obj2){//碰撞检测
       
       var L1=obj1.offsetLeft;
       var R1=obj1.offsetLeft+obj1.offsetWidth;
       var T1=obj1.offsetTop;
       var B1=obj1.offsetTop+obj1.offsetHeight;

       var L2=obj2.offsetLeft+obj2.parentNode.offsetLeft;
       var R2=obj2.offsetLeft+obj2.offsetWidth+obj2.parentNode.offsetLeft;
       var T2=obj2.offsetTop+obj2.parentNode.offsetTop;
       var B2=obj2.offsetTop+obj2.offsetHeight+obj2.parentNode.offsetTop;

       if(R1<L2||L1>R2||B1<T2||T1>B2){
        return false;
       }else{
        return true;
       }
      }

}