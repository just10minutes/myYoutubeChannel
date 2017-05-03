import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeService } from '../../providers/youtube-service';


/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers:[YoutubeService,]
})
export class DetailsPage { 
  post:any;
  onPlaying: boolean = false; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public ytPlayer: YoutubeService) {    
    this.post = navParams.get('post') ;       
    console.log(this.post);
  
}

   launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }
 
   playVideo(e,post): void {
      console.log(post);
      this.onPlaying = true;
      this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  } 
 

  ionViewDidLoad() {       
    this.ytPlayer.loadPlayer();             
    console.log('ionViewDidLoad Details');
    
  }

/*
ionViewDidLeave(){
  this.ytPlayer.destroy();             
    console.log('ionViewDidLeave Details');

}

ionViewWillEnter(){
  this.ytPlayer.loadPlayer();             
    console.log('ionViewWillEnter Entered');
}
*/
 
 

}
