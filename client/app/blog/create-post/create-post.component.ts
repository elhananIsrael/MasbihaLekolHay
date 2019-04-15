import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { ToastComponent } from './../../shared/toast/toast.component';
import { AuthService } from './../../shared/services/auth.service';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private auth: AuthService,
    private toast: ToastComponent
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      imagePath: [""],
      body: ["", [Validators.required, Validators.minLength(20)]]
    });
  }

  onPostFormSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    let post:any = {}
    post.title = this.title.value;
    post.imagePath = this.imagePath;
    post.body = this.body.value;
    post.userId = this.auth.currentUser._id;
    post.userName = this.auth.currentUser.username;
    console.log('wertyui '+ JSON.stringify(post));
    this.postService.createPost(post).subscribe(
        data => {
          // this.toastr.success(data["success"]);
          this.router.navigate(["/blog"]);
        },
      error => this.toast.setMessage('email already exists', 'danger')       
      );
  }

  get title() {
    return this.postForm.get("title");
  }

  get imagePath() {
    let path = this.postForm.get("imagePath").value;
    if (path === null || path === '') {
      path = '/assets/images/blog.png';
    }
    return path;

  }

  get body() {
    return this.postForm.get("body");
  }

}
