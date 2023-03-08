import { NestedComment, TComment } from '../types/Post';

function findCommentInChildren(
  children: NestedComment[],
  parentId: string
): NestedComment | null {
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child._id === parentId) {
      // parent comment is found in this level of children comments
      return child;
    }

    // parent comment may be in grandchildren comments, recursively check each grandchild comment
    if (child.children) {
      const parentComment = findCommentInChildren(child.children, parentId);

      if (parentComment) {
        return parentComment;
      }
    }
  }

  // parent comment is not found in any level of children comments
  return null;
}

function addComment(newComment: NestedComment, comments: TComment[]) {
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];

    if (comment._id === newComment.parent) {
      // parent comment is found in the root comments
      if (!comment.children) {
        comment.children = [];
      }

      comment.children.push(newComment);
      break;
    }

    // parent comment may be in children comments, recursively check each child comment
    if (comment.children) {
      const parentComment = findCommentInChildren(
        comment.children,
        newComment.parent
      );

      if (parentComment) {
        if (!comment.children) {
          comment.children = [];
        }

        comment.children.push(newComment);
        break;
      }
    }
  }

  return comments;
}

export default addComment;