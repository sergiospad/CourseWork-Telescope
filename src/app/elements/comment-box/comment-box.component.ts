import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ImageUploadService} from '../../../service/image-upload.service';
import {CommentShowDto} from '../../../DTO/comment/comment-show.dto';
import {last} from 'rxjs';
import {DateFormatter} from '../../../util/date-formatter';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {CommentService} from '../../../service/comment.service';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommentEditDto} from '../../../DTO/comment/comment-edit.dto';
import {NotificationService} from '../../../service/notification-service';

@Component({
  selector: 'app-comment-box',
  imports: [
    DateFormatter,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatHint,
    MatInput,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.css',
})
export class CommentBoxComponent {
  protected readonly imageUploadService = inject(ImageUploadService);
  private readonly commentService = inject(CommentService)
  private readonly notificationService = inject(NotificationService);
  private static activeComment:number|undefined;
  @Input() allowedToEdit!:boolean;
  @Input() allowedToDelete!:boolean;
  @Input() comment!:CommentShowDto;
  @Output() deleteComment = new EventEmitter<CommentShowDto>();

  protected readonly last = last;

  public getActiveComment():number|undefined{
    return CommentBoxComponent.activeComment;
  }

  public setActiveComment(comment:CommentShowDto){
    CommentBoxComponent.activeComment = comment.id;
  }

  public updateMessage(comment:CommentShowDto){
    const newComment = {
      id: comment.id,
      message: comment.message
    } as CommentEditDto;
    CommentBoxComponent.activeComment = undefined;
    this.commentService.editComment(newComment)
      .subscribe(data=> {
        this.notificationService.showSnackBar("Comment updated");
        comment = data;
      });
  }


}
