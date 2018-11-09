new Vue({
    el: '#app',
    data: {
      startNew:false,
      playerHealth: 100,
      monsterHealth:100,
      moves:[]
    },
    methods:{
      handleStartNew(){
        this.startNew = !this.startNew
      },
      startGame(){
        this.startNew = true
        this.playerHealth=100
        this.monsterHealth=100
        this.moves=[]
      },
      attack(){
        //Player Attack
        let strike = this.damage(2, 5)
        this.monsterHealth -= strike
        this.moves.unshift({
          isPlayer:true,
          text:'You hit Monster for: ' + strike
        })
        if(this.checkWin())return
        //Monster Attack
        this.monsterAttack()
        
      },
      specialAttack(){
        //Player Attack
        let strike = this.damage(4, 10)
        this.monsterHealth -=strike
        this.moves.unshift({
          isPlayer:true,
          text:'You hit Monster HARD for: ' + strike
        })
        //Monster Attack
        this.monsterAttack()
      },
      monsterAttack(){
        let strike = this.damage(3, 7)
        this.playerHealth -= strike
        this.moves.unshift({
          isPlayer:false,
          text:'Monster hits You for ' + strike
        })
        this.checkWin()
      },
      heal(){
        if(this.playerHealth<=90){
          this.playerHealth+=10
        }
        else{
          this.playerHealth=100
        }
        this.moves.unshift({
          isPlayer:true,
          text:'Player Heals for 10'
        })
        this.monsterAttack()
      },
      damage(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      checkWin(){
        if(this.monsterHealth<=0){
          if(confirm('You Won! Start New Game?')){
            this.startGame()
          }
          else{
            this.startNew=false
          }
          return true
        }
        else if(this.playerHealth<=0){
          if(confirm('You Lost! Start New Game?')){
            this.startGame()
          }
          else{
            this.startNew=false
          }
          return true
        }
        return false
      },
      giveUp(){
        this.startGame()
        this.handleStartNew()
      },
      logMoves(){

      }
    }
  });