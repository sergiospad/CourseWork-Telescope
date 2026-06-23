import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {CommentBoxComponent} from '../comment-box/comment-box.component';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {PostShowDto} from '../../../DTO/post/post-show.dto';
import {FormsModule} from '@angular/forms';
import {UserShowNameDto} from '../../../DTO/user/user-show-name.dto';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-comments-section',
  imports: [
    CommentBoxComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    FormsModule
  ],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css',
})
export class CommentsSectionComponent implements OnInit{
  private readonly tokenService = inject(TokenStorageService);
  @Input() comments:CommentShowDto[]|undefined;
  @Input() allowedToDeleteComment!:boolean;
  @Input() post!:PostShowDto;
  currentUser!: UserShowNameDto;
  @Output() sendComment = new EventEmitter<{ message:string, post:PostShowDto }>()
  @Output() deleteComment = new EventEmitter<CommentShowDto>();
  commentText = "";

  handleEnterPress(message:string, post:PostShowDto){
    this.commentText = ''
    this.sendComment.emit({message, post});
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }
}
