import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
   loadedPosts: Post[] = [];
   isFetching = false;
   error = null;
   private errorSub: Subscription;

   constructor(private postService: PostService) {}

   ngOnInit() {
      this.errorSub = this.postService.error.subscribe((errorMessage) => {
         this.error = errorMessage;
      });

      this.isFetching = true;

      this.postService.fetchPosts().subscribe(
         (posts) => {
            this.isFetching = false;
            this.loadedPosts = posts;
         },
         (error) => {
            this.error = error.message;
         }
      );
   }

   onCreatePost(postData: Post) {
      this.postService.createAndStorePost(postData.title, postData.content);
   }

   onFetchPosts() {
      this.isFetching = true;

      this.postService.fetchPosts().subscribe(
         (posts) => {
            this.isFetching = false;
            this.loadedPosts = posts;
         },
         (error) => {
            this.isFetching = false;
            this.error = error.message;
         }
      );
   }

   onClearPosts() {
      this.isFetching = true;
      this.postService.clearPosts().subscribe(() => {
         this.loadedPosts = [];
      });
      this.isFetching = false;
   }

   onHandleError() {
      this.error = null;
   }

   ngOnDestroy(): void {
      this.errorSub.unsubscribe();
   }
}
