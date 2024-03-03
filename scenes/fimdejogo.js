class Final extends Phaser.Scene{
    constructor(){
        super({
            key:'fimdejogo'
        })
    }

    preload(){
        this.load.image('fimdejogo', 'assets/fimdoJogo.png');
    }

    create(){
        this.add.image(larguraJogo/2, alturaJogo/2, 'fimdejogo');
    }
}