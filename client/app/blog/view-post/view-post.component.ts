import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ToastComponent } from './../../shared/toast/toast.component';
import { AuthService } from './../../shared/services/auth.service';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private toast: ToastComponent,
    private postService: PostService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postService.getPost(params["id"]).subscribe(
        data => {
          this.postService.selectedPost = data;
        },
        err => {
          if (err.error && err.error["error"]) {
            // this.toast.console.error(err.error["error"]));

            localStorage.removeItem("uax");
          } else {
            // this.toastr.error("Something went wrong.");
          }
        }
      );
    });

    this.commentForm = this.fb.group({
      commentText: ["", [Validators.required]]
    });
  }

}
