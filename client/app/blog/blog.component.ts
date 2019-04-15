import { ToastComponent } from '../shared/toast/toast.component';
import { Component, OnInit } from "@angular/core";
import { PostService } from './../services/post.service';

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  posts;

  
  constructor(
    private postService: PostService
    // private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      data => this.posts = data,
      error => console.log(error)
    );
  }
}
