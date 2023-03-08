import { NestedComment, TComment } from '../types/Post';

function addComment(newComments: NestedComment[], comments: TComment[]) {
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];

    newComments.every((c) => {
      if (comment._id === c.parent) {
        // parent comment is found in the root comments
        if (!comment.children) {
          comment.children = [];
        }

        comment.children.push(c);
        return true;
      }

      return false;
    });
    // parent comment may be in children comments, recursively check each child comment
    if (comment.children) {
      addComment(newComments, comment.children);
    }
  }

  return comments;
}

export default addComment;
