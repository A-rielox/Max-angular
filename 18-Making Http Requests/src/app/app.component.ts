import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

// https://ng-complete-guide-77886-default-rtdb.firebaseio.com/

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   private url =
      'https://ng-complete-guide-77886-default-rtdb.firebaseio.com/posts.json';
   loadedPosts = [];

   constructor(private http: HttpClient) {}

   ngOnInit() {
      this.fetchPosts();
   }

   onCreatePost(postData: { title: string; content: string }) {
      // Angular agarra el postData y lo pasa a json antes de mandarlo
      this.http.post(this.url, postData).subscribe((responseData) => {
         console.log(responseData);
         // {name: '-ND5ZApr3ukM13YcMVSl'}
      });
   }

   onFetchPosts() {
      // Send Http request
      this.fetchPosts();
   }

   onClearPosts() {
      // Send Http request
   }

   private fetchPosts() {
      this.http
         .get(this.url)
         .pipe(
            map((responseData) => {
               const postArray = [];

               // for-in va pasando las keys
               for (const key in responseData) {
                  postArray.push({ ...responseData[key], id: key });
               }

               return postArray;
            })
         )
         .subscribe((posts) => {
            console.log(posts);
         });
      // la respuesta original
      // {-ND5ZApr3ukM13YcMVSl: {content:…, title: ...}}
   }
}
