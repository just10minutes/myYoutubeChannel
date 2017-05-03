import { Component, ViewChild } from '@angular/core';

import { NavController, Content, ModalController } from 'ionic-angular';
import { YoutubeService } from '../../providers/youtube-service';
import { DetailsPage } from '../details/details';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [YoutubeService]
})
export class HomePage {


  //channelID: string = 'UCbtVfS6cflbIXTZ0nGeRWVA';
  channelID: string = 'UCfwHP1M0AFSPqTdjzXhV0Zg';
  maxResults: string = '10';
  pageToken: string;
  //googleToken: string = 'AIzaSyBQtmWKpDfN0KS7FQW68WbGKzQX17V5fAY';
  googleToken: string = 'AIzaSyDakOEmUYr0Fq_1-DQLkZCDSPn8vFuvVtg';
  //searchQuery: string = 'ravetraintv -kissing';
  searchQuery: string = '';
  posts: any = [];
  onPlaying: boolean = false;
  videoDetails: any;
  descriptionClicked: boolean = false;
  constructor(public http: Http, public nav: NavController, public ytPlayer: YoutubeService, public modalCtrl: ModalController) {
    this.loadSettings();
  }

  loadSettings(): void {
    this.fetchData();
  }
  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }

  fetchData(): void {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + this.searchQuery + '&type=video&order=date&maxResults=' + this.maxResults + '&key=' + this.googleToken;

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {

      console.log(data.items);
      console.log("Before Individual Details");
      // *** Get individual video data like comments, likes and viewCount. Enable this if you want it.
      let newArray = data.items.map((entry) => {
        let videoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics&id=' + entry.id.videoId + '&key=' + this.googleToken;
        this.http.get(videoUrl).map(videoRes => videoRes.json()).subscribe(videoData => {
          console.log(videoData);
          console.log("Test this")
          this.posts = this.posts.concat(videoData.items);
          return entry.extra = videoData.items;
        });
      });
      //this.posts = this.posts.concat(data.items);
    });
  }

  
    playVideo2(post): void {
    this.nav.push(DetailsPage, {
       post:post
    });     
   } 
   
  @ViewChild(Content) content: Content;
  playVideo(e, post): void {
    console.log(post);
    this.onPlaying = true;
    this.ytPlayer.launchPlayer(post.id, post.snippet.title);
    this.videoDetails = post;
    console.log(this.videoDetails)
    this.content.resize();

  }

  loadMore(): void {
    console.log("TODO: Implement loadMore()");

  }

  onDescriptionClick() {
    this.descriptionClicked = !this.descriptionClicked;
  }

  onShareClick() {
    console.log("Share button clicked")
  }

  presentDescriptionModal() {
    let descriptionModal = this.modalCtrl.create(DetailsPage);
    descriptionModal.present();
  }

}
