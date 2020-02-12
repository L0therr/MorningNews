export default function(wishList = [], action) {
    if(action.type === 'add') {
        var wishListCopy = [...wishList];
        wishListCopy.push(action.articleLiked);
        return wishListCopy;
    } else if(action.type === 'rmv') {
        var wishListCopy = [...wishList];
        wishListCopy.splice(action.pos, 1);
        return wishListCopy;
    } else {
        return wishList;
    }
   
  }