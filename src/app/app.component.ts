import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      statusBar.styleDefault();
      splashScreen.hide();
      
    });

    platform.pause.subscribe(()=>{
      console.log('App Paused');
      events.publish('App:Paused');
    });

    platform.resume.subscribe(()=>{
      console.log('App Resume');
      events.publish('App:Resume');
    }); 
  }
}
